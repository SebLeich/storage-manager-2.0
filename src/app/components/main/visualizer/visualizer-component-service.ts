import { HttpClient } from "@angular/common/http";
import { ElementRef, Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, ReplaySubject, Subject, Subscription } from "rxjs";
import { debounceTime, map, take } from "rxjs/operators";
import { Container, Dimension, Good, Group, Solution } from "src/app/classes";
import { defaultGoodEdgeColor, generateGuid, keyboardControlMoveStep, selectedGoodEdgeColor } from "src/app/globals";
import { DataService } from "src/app/services/data.service";
import * as ThreeJS from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable()
export class VisualizerComponentService {

    scene = new ThreeJS.Scene();
    renderer = new ThreeJS.WebGLRenderer({ antialias: true });
    camera: ThreeJS.PerspectiveCamera = null;
    controls: OrbitControls = null;
    gridHelper: ThreeJS.GridHelper = null;
    ray: ThreeJS.Raycaster = new ThreeJS.Raycaster();

    private _container: ReplaySubject<Container> = new ReplaySubject<Container>(1);
    private _visualizerWrapper: ReplaySubject<ElementRef<HTMLDivElement>> = new ReplaySubject<ElementRef<HTMLDivElement>>(1);
    private _hoverIntersections: ReplaySubject<MouseEvent> = new ReplaySubject<MouseEvent>(1);
    private _hoveredElement: BehaviorSubject<{ preview: string, groupColor: string, groupId: number, seqNr: number, goodId: number, mesh: ThreeJS.Mesh, edges: ThreeJS.LineSegments }> = new BehaviorSubject<{ preview: string, groupColor: string, groupId: number, seqNr: number, goodId: number, mesh: ThreeJS.Mesh, edges: ThreeJS.LineSegments }>(null);
    private _selectedElement: BehaviorSubject<{ preview: string, groupColor: string, groupId: number, seqNr: number, goodId: number, mesh: ThreeJS.Mesh, edges: ThreeJS.LineSegments }> = new BehaviorSubject<{ preview: string, groupColor: string, groupId: number, seqNr: number, goodId: number, mesh: ThreeJS.Mesh, edges: ThreeJS.LineSegments }>(null);

    visualizerWrapper$ = this._visualizerWrapper.asObservable();
    container$ = this._container.asObservable();
    hoverIntersections$ = this._hoverIntersections.pipe(debounceTime(5));
    hoveredElement$ = this._hoveredElement.asObservable();
    hoveredGood$ = combineLatest([this.container$, this.hoveredElement$]).pipe(map(([container, element]) => {
        return element ? container._Goods.find(x => x._Id === element.goodId) : null;
    }));
    selectedElement$ = this._selectedElement.asObservable();
    selectedGood$ = combineLatest([this.container$, this.selectedElement$]).pipe(map(([container, element]) => {
        return element ? container._Goods.find(x => x._Id === element.goodId) : null;
    }));

    private _sceneBodyId: string = generateGuid();

    private _resized = new Subject<void>();
    resized$ = this._resized.pipe(debounceTime(300));

    defaultSolution: Solution = null;

    private _meshes: { preview: string, groupColor: string, groupId: number, seqNr: number, goodId: number, mesh: ThreeJS.Mesh, edges: ThreeJS.LineSegments }[] = [];
    private _subscriptions: Subscription[] = [];

    constructor(
        private _httpClient: HttpClient,
        private _dataService: DataService
    ) {
        this._setUp();
    }

    addContainerToScene(container: Container, groups: Group[]) {
        this._container.next(container);
        while (this.scene.children.length > 0) this.scene.remove(this.scene.children[0]);
        var from = new ThreeJS.Vector3(0, (container._Height / -2), (container._Length / 2));
        var to = new ThreeJS.Vector3(0, (container._Height / -2), (container._Length / 2) + 1000);
        var direction = to.clone().sub(from);
        var length = direction.length();
        var arrowHelper = new ThreeJS.ArrowHelper(direction.normalize(), from, length, "red");
        this.scene.add(arrowHelper);
        var gridHelper = new ThreeJS.GridHelper(1.5 * container._Length, 15);
        gridHelper.position.set(0, (container._Height / -2), 0);
        this.scene.add(gridHelper);
        this._addElementToScene(DataService.getContainerDimension(container), 'Container', 'bordered', null, null, null, null)
        for (var good of container._Goods) {
            let group = groups.find(x => x._Id === good._Group);
            this._addElementToScene(DataService.getGoodDimension(good), `${good._Desc}`, 'filled', good._SequenceNr, good._Id, group, DataService.getContainerDimension(container));
        }
    }

    dispose() {
        for (let sub of this._subscriptions) sub.unsubscribe();
        this._subscriptions = [];
    }

    highlightGood(good: Good) {

        let meshes = this.scene.children.filter(x => x instanceof ThreeJS.Mesh) as ThreeJS.Mesh[];

        meshes.forEach(x => {
            let meshWrapper = this._meshes.find(y => y.mesh === x);
            ((x as ThreeJS.Mesh).material as ThreeJS.MeshBasicMaterial).color.set(meshWrapper ? meshWrapper.goodId === good._Id ? 'white' : meshWrapper.groupColor : null);
        });
    }

    keydown(event: KeyboardEvent) {
        let updateProjection = false;
        switch (event.key) {
            case 'w':
                this.camera.position.y -= keyboardControlMoveStep;
                updateProjection = true;
                break;
            case 's':
                this.camera.position.y += keyboardControlMoveStep;
                updateProjection = true;
                break;
            case 'a':
                this.camera.position.x += keyboardControlMoveStep;
                updateProjection = true;
                break;
            case 'd':
                this.camera.position.x -= keyboardControlMoveStep;
                updateProjection = true;
                break;
            case 'y':
                this.camera.position.z += keyboardControlMoveStep;
                updateProjection = true;
                break;
            case 'x':
                this.camera.position.z -= keyboardControlMoveStep;
                updateProjection = true;
                break;
        }
        if (updateProjection) {
            this.camera.updateProjectionMatrix();
            this.controls.update();
        }
    }

    mouseclick(event: MouseEvent) {
        if ((event.target as HTMLCanvasElement).id === this._sceneBodyId) {
            this.visualizerWrapper$.pipe(take(1)).subscribe(wrapper => {
                let pointedElement = this._getPointedElement(event, wrapper);
                this._selectedElement.next(pointedElement ? this._meshes.find(x => x.mesh === pointedElement.object) : null);
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

    selectGood(good: Good) {
        let wrapper = this._meshes.find(x => x.goodId === good._Id);
        if (wrapper) this._selectedElement.next(wrapper);
    }

    setSceneDimensions(width: number, height: number) {
        this.camera = new ThreeJS.PerspectiveCamera(20, width / height, 1, 10000000);
        this.camera.position.set(12000, 5000, 10000);
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

    updateGroupColors(){
        this._dataService.currentGroups$.pipe(take(1)).subscribe((groups: Group[]) => {
            this._meshes.forEach(x => {
                let group = groups.find(y => y._Id === x.groupId);
                x.groupColor = group?._Color ?? null;
                ((x.mesh as ThreeJS.Mesh).material as ThreeJS.MeshBasicMaterial).color.set(x.groupColor);
            })
        });
    }

    private _addElementToScene(dimension: Dimension, preview: string, type: null | 'bordered' | 'filled', sequenceNumber: number = null, goodId: number = null, group: Group = null, parentDimension: Dimension = null) {

        var length = dimension.length;
        if (!length) length = (parentDimension.length - dimension.z); // rotation

        var mesh: ThreeJS.Mesh;
        var edges: ThreeJS.LineSegments;

        switch (type) {

            case "filled":
                var color = group && group._Color ? group._Color : "rgb(200, 200, 200)";
                var groupId = group && group._Id ? group._Id : null;

                var geometry = new ThreeJS.BoxGeometry(dimension.width, dimension.height, length, 4, 4, 4);  // rotation
                var material = new ThreeJS.MeshBasicMaterial({ color: color });
                mesh = new ThreeJS.Mesh(geometry, material);
                edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(mesh.geometry), new ThreeJS.LineBasicMaterial({ color: defaultGoodEdgeColor, linewidth: 1 }));

                var meshWrapper = {
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
                var geometry = new ThreeJS.BoxBufferGeometry(dimension.width, dimension.height, dimension.length);
                edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(geometry), new ThreeJS.LineBasicMaterial({ color: 0x333333, linewidth: 1 }));
                break;
        }
        var x = parentDimension ? dimension.x - (parentDimension.width / 2) + (dimension.width / 2) : dimension.x;
        var y = parentDimension ? dimension.y - (parentDimension.height / 2) + (dimension.height / 2) : dimension.y;
        var z = parentDimension ? dimension.z - (parentDimension.length / 2) + (dimension.length / 2) : dimension.z;
        if (mesh) {
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.position.z = z;
            this.scene.add(mesh);
        }
        if (edges != null) {
            edges.position.set(x, y, z);
            this.scene.add(edges);
        }
    }

    private _getPointedElement(event: MouseEvent, wrapper: ElementRef<HTMLDivElement>, meshes: ThreeJS.Mesh[] = null) {

        if (!Array.isArray(meshes)) meshes = this.scene.children.filter(x => x instanceof ThreeJS.Mesh) as ThreeJS.Mesh[];

        let x = ((event.clientX - (wrapper.nativeElement.offsetParent as HTMLDivElement).offsetLeft - (wrapper.nativeElement as HTMLDivElement).offsetLeft) / (event.target as HTMLCanvasElement).offsetWidth) * 2 - 1;
        let y = -((event.clientY - (event.target as HTMLCanvasElement).offsetTop) / (event.target as HTMLCanvasElement).offsetHeight) * 2 + 1;

        this.ray.setFromCamera({ x: x, y: y }, this.camera);
        const intersects = this.ray.intersectObjects(meshes);

        var found = null;
        intersects.forEach(function (object) {
            if (object.object instanceof ThreeJS.Mesh && (found == null || found.distance > object.distance)) found = object;
        });

        return found;
    }

    private _highlightIntersections(event: MouseEvent, wrapper: ElementRef<HTMLDivElement>) {

        let meshes = this.scene.children.filter(x => x instanceof ThreeJS.Mesh) as ThreeJS.Mesh[];

        meshes.forEach(x => {
            let meshWrapper = this._meshes.find(y => y.mesh === x);
            ((x as ThreeJS.Mesh).material as ThreeJS.MeshBasicMaterial).color.set(meshWrapper ? meshWrapper.groupColor : null);
        });

        let found = this._getPointedElement(event, wrapper, meshes);

        if (found != null) (found.object as any).material.color.set("white");

        this._hoveredElement.next(found && found.object ? this._meshes.find(x => x.mesh === found.object) : null);
    }

    private _setUp() {
        this.scene.background = new ThreeJS.Color('rgb(238,238,238)');
        this.renderer.domElement.id = this._sceneBodyId;
        /*
        this._httpClient.get('/assets/defaultSolution.json').subscribe((solution: Solution) => {
            this.defaultSolution = solution;
            this._dataService.setCurrentSolution(solution);
        });
        */
        this._subscriptions.push(...[
            combineLatest([this.hoverIntersections$, this.visualizerWrapper$]).subscribe(([event, wrapper]) => {
                this._highlightIntersections(event, wrapper);
            }),
            this._selectedElement.subscribe(element => {
                for (let mesh of this._meshes) {
                    if (mesh && mesh.edges) {
                        let color = mesh === element ? selectedGoodEdgeColor : defaultGoodEdgeColor;
                        (mesh.edges.material as ThreeJS.LineBasicMaterial).color = new ThreeJS.Color(color);
                    }
                }
            }),
            this._dataService.currentSolution$.subscribe((solution: Solution) => {
                this.addContainerToScene(solution._Container, solution._Groups);
            })
        ]);
    }

}   