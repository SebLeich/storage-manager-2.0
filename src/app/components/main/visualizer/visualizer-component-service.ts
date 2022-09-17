import { ElementRef, Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, ReplaySubject, Subject, Subscription } from "rxjs";
import { debounceTime, filter, map, take } from "rxjs/operators";
import { defaultGoodEdgeColor, infinityReplacement, keyboardControlMoveStep, selectedGoodEdgeColor } from "src/app/globals";
import { IGroup } from "src/app/interfaces/i-group.interface";
import { IStep } from "src/app/interfaces/i-step.interface";
import { DataService } from "src/app/services/data.service";
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
import { v4 as generateGuid } from 'uuid';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { IGood } from "src/app/interfaces/i-good.interface";

import { Store } from "@ngrx/store";
import { selectCurrentSolution } from "src/app/store/selectors/i-solution.selectors";
import { IContainer } from "src/app/interfaces/i-container.interface";
import { IPosition } from "src/app/interfaces/i-position.interface";
import { FileService } from "src/app/services/file.service";
import { selectGroups } from "src/app/store/selectors/i-group.selectors";

import * as ThreeJS from 'three';
import { ISolution } from "src/app/interfaces/i-solution.interface";

@Injectable()
export class VisualizerComponentService {

    scene = new ThreeJS.Scene();
    renderer = new ThreeJS.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
    });
    camera!: ThreeJS.PerspectiveCamera;
    controls!: OrbitControls;
    gridHelper!: ThreeJS.GridHelper;
    ray: ThreeJS.Raycaster = new ThreeJS.Raycaster();

    private _container = new ReplaySubject<IContainer>(1);
    private _visualizerWrapper: ReplaySubject<ElementRef<HTMLDivElement>> = new ReplaySubject<ElementRef<HTMLDivElement>>(1);
    private _hoverIntersections: ReplaySubject<MouseEvent> = new ReplaySubject<MouseEvent>(1);
    private _hoveredElement = new BehaviorSubject<{ preview: string, groupColor: string | null, groupId: string | null, seqNr: number | null, goodId: string | null, mesh: ThreeJS.Mesh, edges: ThreeJS.LineSegments } | null | undefined>(null);
    private _selectedElement = new BehaviorSubject<{ preview: string, groupColor: string | null, groupId: string | null, seqNr: number | null, goodId: string | null, mesh: ThreeJS.Mesh, edges: ThreeJS.LineSegments } | null | undefined>(null);

    visualizerWrapper$ = this._visualizerWrapper.asObservable();
    container$ = this._container.asObservable();
    hoverIntersections$ = this._hoverIntersections.pipe(debounceTime(5));
    hoveredElement$ = this._hoveredElement.asObservable();
    hoveredGood$ = combineLatest([this.container$, this.hoveredElement$]).pipe(map(([container, element]) => {
        return element ? container.goods.find(x => x.id === element.goodId) : null;
    }));
    selectedElement$ = this._selectedElement.asObservable();
    selectedGood$ = combineLatest([this.container$, this.selectedElement$]).pipe(map(([container, element]) => {
        return element ? container.goods.find(x => x.id === element.goodId) : null;
    }));

    private _sceneBodyId: string = generateGuid();

    private _resized = new Subject<void>();
    resized$ = this._resized.pipe(debounceTime(100));

    private _meshes: { preview: string, groupColor: string | null, groupId: string | null, seqNr: number | null, goodId: string | null, mesh: ThreeJS.Mesh, edges: ThreeJS.LineSegments }[] = [];
    private _subscriptions: Subscription = new Subscription();

    constructor(private _store: Store) {
        this._setUp();
    }

    public addContainerToScene(container: IContainer, groups: IGroup[]) {
        this.clearScene();
        this._addUnloadingArrowToScene(container.height!, container.length!);
        this._addBaseGridToScene(container.height!, container.length!);
        this._addContainerToScene(DataService.getContainerDimension(container));
        this._container.next(container);
        this._addElementToScene(DataService.getContainerDimension(container), 'Container', 'bordered');
        for (var good of container.goods) {
            let group = groups.find(x => x.id === good.group);
            this._addElementToScene(DataService.getGoodDimension(good), `${good.desc}`, 'good', good.sequenceNr, good.id, group, DataService.getContainerDimension(container));
        }
    }

    async animateStep(step: IStep, keepPreviousGoods: boolean = false, keepPreviousUnusedSpaces: boolean = false) {
        const container = await selectSnapshot(this._store.select(selectCurrentSolution).pipe(map(solution => solution?.container!)));
        if (!container) {
            return;
        }
        this.clearScene(keepPreviousGoods, keepPreviousUnusedSpaces, [step.usedPosition?.id ?? null].filter(guid => !!guid) as string[]);
        this._addUnloadingArrowToScene(container.height, container.length);
        this._addBaseGridToScene(container.height, container.length);
        this._addContainerToScene(DataService.getContainerDimension(container));
        if (step.placedAtPosition) this._addElementToScene(step.placedAtPosition, '', 'good', step.sequenceNumber, null, null, DataService.getContainerDimension(container));
        for (let unusedDimension of step.createdPositions ?? []) {
            this._addElementToScene(unusedDimension, '', unusedDimension.length === Infinity ? 'infiniteSpace' : 'unusedSpace', step.sequenceNumber, null, null, DataService.getContainerDimension(container), unusedDimension.id);
        }
    }

    clearScene(keepPreviousGoods: boolean = false, keepPreviousUnusedSpaces: boolean = false, removeDimensionsAnyway: string[] = []) {
        let remove = this.scene.children.filter(child => removeDimensionsAnyway.indexOf(child.userData.dimensionGuid) > -1 || !(
            (keepPreviousGoods && child.userData.type === 'good')
            || (keepPreviousUnusedSpaces && (child.userData.type === 'infiniteSpace' || child.userData.type === 'unusedSpace'))
        ));
        for (let child of remove) this.scene.remove(child);
    }

    dispose = () => this._subscriptions.unsubscribe();

    public downloadScreenshot() {
        const strMime = "image/jpeg";
        const imgData = this.renderer.domElement.toDataURL(strMime);
        FileService.downloadFile(imgData, 'screenshot.jpg');
    }

    highlightGood(good: IGood) {
        const meshes = this.scene.children.filter(x => x instanceof ThreeJS.Mesh) as ThreeJS.Mesh[];
        meshes.map(mesh => this._meshes.find(meshWrapper => meshWrapper.mesh === mesh))
            .filter(meshWrapper => !!meshWrapper)
            .forEach(meshWrapper => {
                (meshWrapper?.mesh.material as ThreeJS.MeshBasicMaterial).color.set(meshWrapper?.goodId === good.id ? 'white' : meshWrapper?.groupColor ?? 'black');
            });
    }

    highlightGoods = (goods: IGood[]) => goods.forEach(good => this.highlightGood(good));

    keydown(event: KeyboardEvent) {
        let updateProjection = false;
        let updateControls = false;
        switch (event.key) {
            case 'w':
                this.controls.target.set(this.controls.target.x, this.controls.target.y - keyboardControlMoveStep, this.controls.target.z);
                updateControls = true;
                break;
            case 's':
                this.controls.target.set(this.controls.target.x, this.controls.target.y + keyboardControlMoveStep, this.controls.target.z);
                updateControls = true;
                break;
            case 'a':
                this.controls.target.set(this.controls.target.x + keyboardControlMoveStep, this.controls.target.y, this.controls.target.z);
                updateControls = true;
                break;
            case 'd':
                this.controls.target.set(this.controls.target.x - keyboardControlMoveStep, this.controls.target.y, this.controls.target.z);
                updateControls = true;
                break;
            case 'y':
                this.controls.target.set(this.controls.target.x, this.controls.target.y, this.controls.target.z + keyboardControlMoveStep);
                updateControls = true;
                break;
            case 'x':
                this.controls.target.set(this.controls.target.x, this.controls.target.y, this.controls.target.z - keyboardControlMoveStep);
                updateControls = true;
                break;
        }
        if (updateProjection) {
            this.camera.updateProjectionMatrix();
            this.controls.update();
        }
        if (updateControls) this.controls.update();
    }

    mouseclick(event: MouseEvent) {
        if ((event.target as HTMLCanvasElement).id === this._sceneBodyId) {
            this.visualizerWrapper$.pipe(take(1)).subscribe(wrapper => {
                let pointedElement: any = this._getPointedElement(event, wrapper);
                this._selectedElement.next(pointedElement ? this._meshes.find(x => x.mesh === pointedElement?.object) : null);
            });
        }
    }

    mousemove(event: MouseEvent) {
        if ((event.target as HTMLCanvasElement).id === this._sceneBodyId) this._hoverIntersections.next(event);
    }

    render() {
        requestAnimationFrame(() => this.render());
        this.renderer.render(this.scene, this.camera);
    }

    async reRenderCurrentContainer() {
        const container = await selectSnapshot(this._store.select(selectCurrentSolution).pipe(map(solution => solution?.container!)));
        const groups = await selectSnapshot(this._store.select(selectGroups));
        if (!container) {
            return;
        }
        this.addContainerToScene(container, groups);
    }

    selectGood(good: IGood) {
        let wrapper = this._meshes.find(x => x.goodId === good.id);
        if (wrapper) this._selectedElement.next(wrapper);
    }

    setSceneDimensions(width: number, height: number, preventCameraPositionReset: boolean = false) {
        if (!this.camera || !preventCameraPositionReset) {
            this.camera = new ThreeJS.PerspectiveCamera(20, width / height, 1, 10000000);
            this.camera.position.set(12000, 5000, 10000);
        }
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5000;
        this.controls.maxDistance = 50000;
        this.controls.rotateSpeed = 1;
        this.controls.update();
        this.render();
    }

    setVisualizerWrapper(ref: ElementRef<HTMLDivElement>) {
        this._visualizerWrapper.next(ref);
        this.setSceneDimensions(ref.nativeElement.clientWidth, ref.nativeElement.clientHeight);
        ref.nativeElement.append(this.renderer.domElement);
    }

    triggerResizeEvent = () => this._resized.next();

    async updateGroupColors() {
        const groups: IGroup[] = await selectSnapshot(this._store.select(selectGroups));
        this._meshes.forEach(meshWrapper => {
            const group = groups.find(group => group.id === meshWrapper.goodId);
            meshWrapper.groupColor = group?.color ?? '';
            ((meshWrapper.mesh as ThreeJS.Mesh).material as ThreeJS.MeshBasicMaterial).color.set(meshWrapper.groupColor);
        });
    }

    private _addBaseGridToScene(containerHeight: number, containerLength: number) {
        var gridHelper = new ThreeJS.GridHelper(1.5 * containerLength, 15);
        gridHelper.position.set(0, (containerHeight / -2), 0);
        this.scene.add(gridHelper);
    }

    private _addContainerToScene(dimension: IPosition) {
        this._addElementToScene(dimension, 'Container', 'bordered');
    }

    private _addElementToScene(dimension: IPosition, preview: string, type: null | 'bordered' | 'good' | 'infiniteSpace' | 'unusedSpace', sequenceNumber: number | null = null, goodId: string | null = null, group: IGroup | null = null, parentDimension: IPosition | null = null, dimensionGuid: string | null = null) {

        var length = dimension.length;
        if (!length) length = (parentDimension!.length! - dimension.zCoord!); // rotation

        var mesh!: ThreeJS.Mesh;
        var edges!: ThreeJS.LineSegments;

        switch (type) {

            case "good":
                const color = group && group.color ? group.color : "rgb(200, 200, 200)";
                const groupId = group && group.id ? group.id : null;

                var geometry = new ThreeJS.BoxGeometry(dimension.width!, dimension.height!, length, 4, 4, 4);  // rotation
                var material = new ThreeJS.MeshBasicMaterial({ color: color });
                mesh = new ThreeJS.Mesh(geometry, material);
                mesh.userData = { type: type };
                edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(mesh.geometry), new ThreeJS.LineBasicMaterial({ color: defaultGoodEdgeColor, linewidth: 1 }));
                edges.userData = { type: type, dimensionGuid: dimensionGuid };

                const meshWrapper = {
                    preview: preview,
                    groupColor: color,
                    groupId: groupId,
                    seqNr: sequenceNumber,
                    goodId: goodId,
                    mesh: mesh,
                    edges: edges
                };
                this._meshes.push(meshWrapper);

                meshWrapper.mesh.add(edges);
                break;

            default:
                let edgeColor = type === 'infiniteSpace' ? 'orange' : type === 'unusedSpace' ? 'red' : 'black';
                var geometry = new ThreeJS.BoxGeometry(dimension.width!, dimension.height!, dimension.length === Infinity ? infinityReplacement : dimension.length!);
                edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(geometry), new ThreeJS.LineBasicMaterial({ color: edgeColor, linewidth: 1 }));
                edges.userData = { type: type, dimensionGuid: dimensionGuid };
                break;
        }

        const x = parentDimension ? dimension.xCoord! - (parentDimension.width! / 2) + (dimension.width! / 2) : dimension.xCoord;
        const y = parentDimension ? dimension.yCoord! - (parentDimension.height! / 2) + (dimension.height! / 2) : dimension.yCoord;
        const z = parentDimension ? dimension.zCoord! - (parentDimension.length! / 2) + ((dimension.length === Infinity ? infinityReplacement : dimension.length!) / 2) : dimension.zCoord;

        if (mesh) {
            mesh.position.x = x!;
            mesh.position.y = y!;
            mesh.position.z = z!;
            this.scene.add(mesh);
        }

        if (edges != null) {
            edges.position.set(x!, y!, z!);
            this.scene.add(edges);
        }
    }

    private _addUnloadingArrowToScene(containerHeight: number, containerLength: number) {
        var from = new ThreeJS.Vector3(0, (containerHeight / -2), (containerLength / 2));
        var to = new ThreeJS.Vector3(0, (containerHeight / -2), (containerLength / 2) + 1000);
        var direction = to.clone().sub(from);
        var length = direction.length();
        var arrowHelper = new ThreeJS.ArrowHelper(direction.normalize(), from, length, "red");
        this.scene.add(arrowHelper);
    }

    private _getPointedElement(event: MouseEvent, wrapper: ElementRef<HTMLDivElement>, meshes: ThreeJS.Mesh[] | null = null) {

        if (!Array.isArray(meshes)) meshes = this.scene.children.filter(x => x instanceof ThreeJS.Mesh) as ThreeJS.Mesh[];

        let x = ((event.clientX - (wrapper.nativeElement.offsetParent as HTMLDivElement).offsetLeft - (wrapper.nativeElement as HTMLDivElement).offsetLeft) / (event.target as HTMLCanvasElement).offsetWidth) * 2 - 1;
        let y = -((event.clientY - (event.target as HTMLCanvasElement).offsetTop) / (event.target as HTMLCanvasElement).offsetHeight) * 2 + 1;

        this.ray.setFromCamera({ x: x, y: y }, this.camera);
        const intersects = this.ray.intersectObjects(meshes);

        var found: null | ThreeJS.Intersection = null;
        intersects.forEach(function (object) {
            if (object.object instanceof ThreeJS.Mesh && (found == null || found.distance > object.distance)) found = object;
        });

        return found;
    }

    private _highlightIntersections(event: MouseEvent, wrapper: ElementRef<HTMLDivElement>) {

        let meshes = this.scene.children.filter(x => x instanceof ThreeJS.Mesh) as ThreeJS.Mesh[];

        meshes.forEach(x => {
            let meshWrapper = this._meshes.find(y => y.mesh === x);
            // @ts-ignore
            ((x as ThreeJS.Mesh).material as ThreeJS.MeshBasicMaterial).color.set(meshWrapper ? meshWrapper.groupColor : null);
        });

        const found: any = this._getPointedElement(event, wrapper, meshes);
        if (found && found.object) {
            (found.object as any).material.color.set("white");
            const mesh = this._meshes.find(x => x.mesh === found.object);
            this._hoveredElement.next(mesh);
        } else {
            this._hoveredElement.next(null);
        }
        this._hoveredElement.next(found && found.object ? this._meshes.find(x => x.mesh === found.object) : null);
    }

    private _setUp() {

        this.scene.background = new ThreeJS.Color('rgb(238,238,238)');
        this.renderer.domElement.id = this._sceneBodyId;

        this._subscriptions.add(
            combineLatest([this.hoverIntersections$, this.visualizerWrapper$]).subscribe(([event, wrapper]) => {
                this._highlightIntersections(event, wrapper);
            })
        );

        this._subscriptions.add(
            combineLatest([this._store.select(selectCurrentSolution), this._store.select(selectGroups)])
                .pipe(filter(([solution, _]) => !!solution && !!solution.container))
                .subscribe(([solution, groups]) => {
                    this.addContainerToScene((solution as ISolution).container, groups);
                })
        )

        this._subscriptions.add(
            this._selectedElement.subscribe(element => {
                for (let mesh of this._meshes) {
                    if (mesh && mesh.edges) {
                        let color = mesh === element ? selectedGoodEdgeColor : defaultGoodEdgeColor;
                        (mesh.edges.material as ThreeJS.LineBasicMaterial).color = new ThreeJS.Color(color);
                    }
                }
            })
        );
    }

}   