import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Optional, Output, SimpleChanges, ViewChild, computed, effect, input, signal } from '@angular/core';
import { BehaviorSubject, debounceTime, firstValueFrom, fromEvent, interval, map, ReplaySubject, switchMap, takeWhile, timer } from 'rxjs';
import { Box3, LineSegments, Mesh, PerspectiveCamera, Scene, Vector3 } from 'three';
import { MeshBasicMaterial } from 'three';
import { Store } from '@ngrx/store';
import { IVisualizerContextService, VISUALIZER_CONTEXT } from 'src/app/interfaces/i-visualizer-context.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SceneVisualizationComponentService } from './service/scene-visualization-component.service';
import { Good } from '@/lib/storage-manager/types/good.type';
import { showAnimation } from '@/lib/shared/animations/show';
import { WallTexture } from '@/lib/storage-manager/types/wall-texture.type';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ObjectSite } from '@/lib/storage-manager/types/object-site.type';
import { selectCurrentSolutionGoods, selectCurrentSolutionGroups } from '../../store/visualization.selectors';

@Component({
    selector: 'app-scene-visualization',
    templateUrl: './scene-visualization.component.html',
    styleUrls: ['./scene-visualization.component.scss'],
    providers: [SceneVisualizationComponentService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [showAnimation]
})
export class SceneVisualizationComponent implements OnChanges, OnInit {
    @ViewChild('visualizationWrapper', { static: true }) public visualizerWrapperRef!: ElementRef<HTMLDivElement>;

    @Input() public scene!: Scene;

    @Output() public addLightsToggled = new EventEmitter<boolean>();
    @Output() public fillEmptySpaceToggled = new EventEmitter<boolean>();
    @Output() public sceneSettingsToggled = new EventEmitter<boolean>();
    @Output() public sceneRendered = new EventEmitter<{ canvas: HTMLCanvasElement }>();
    @Output() public hoveredGood = new EventEmitter<string | null>();
    @Output() public selectGood = new EventEmitter<string | null>();
    @Output() public containerColorChanged = new EventEmitter<WallTexture>();
    @Output() public showBaseGridChanged = new EventEmitter<boolean>();
    @Output() public backgroundColorChanged = new EventEmitter<string>();
    @Output() public displaySceneSettingsChanged = new EventEmitter<boolean>();
    @Output() public wallObjectSitesChanged = new EventEmitter<ObjectSite[]>();
    @Output() public goodLabelObjectSitesChanged = new EventEmitter<ObjectSite[]>();
    @Output() public showContainerChanged = new EventEmitter<boolean>();
    @Output() public showContainerEdgesChanged = new EventEmitter<boolean>();
    @Output() public showContainerUnloadingArrowChanged = new EventEmitter<boolean>();
    @Output() public showEmptySpaceChanged = new EventEmitter<boolean>();
    @Output() public showEmptySpaceEdgesChanged = new EventEmitter<boolean>();
    @Output() public showGoodsChanged = new EventEmitter<boolean>();
    @Output() public showGoodEdgesChanged = new EventEmitter<boolean>();

    public addLights = input<boolean>(true);
    public backgroundColor = input<string>('#ffffff');
    public fillEmptySpace = input<boolean>(false);
    public showBaseGrid = input<boolean>(false);
    public showContainer = input<boolean>(false);
    public showContainerUnloadingArrow = input<boolean>(false);
    public showContainerEdges = input<boolean>(false);
    public showEmptySpace = input<boolean>(false);
    public showEmptySpaceEdges = input<boolean>(false);
    public showGoods = input<boolean>(true);
    public showGoodEdges = input<boolean>(false);
    public responsive = input<boolean>(true);
    public interactable = input<boolean>(true);
    public displaySceneSettings = input<boolean>(true);
    public displaySceneSettingsDirection = signal<'top' | 'right' | 'bottom' | 'left' | 'none'>('right');
    public wallObjectSites = input<ObjectSite[]>([]);
    public goodLabelObjectSites = input<ObjectSite[]>([]);
    public orientation = computed(() => {
        const direction = this.displaySceneSettingsDirection();
        return direction === 'top' || direction === 'bottom' ? 'horizontal' : 'vertical';
    });

    public containerColor = input<WallTexture>("black");

    public resized$ = fromEvent(window, 'resize').pipe(debounceTime(50));
    public position$ = this.sceneVisualizationComponentService
        .cameraChanged$
        .pipe(map((camera) => camera?.position));

    public zoom$ = this.sceneVisualizationComponentService
        .cameraChanged$
        .pipe(map((camera) => camera?.zoom));

    private _hoveredGoodId = new BehaviorSubject<null | string>(null);
    public hoveredGood$ = this._hoveredGoodId.pipe(
        switchMap((goodId) =>
            this._store
                .select(selectCurrentSolutionGoods)
                .pipe(map((goods) => goods.find((good) => good.id === goodId)))
        )
    );

    private _ = effect(() => {
        this.displaySceneSettings(),
            this.displaySceneSettingsDirection();

        window.dispatchEvent(new CustomEvent('resize'));
    });

    private _sceneRendered = new ReplaySubject<{ canvas: HTMLCanvasElement }>(1);

    constructor(
        @Optional() @Inject(VISUALIZER_CONTEXT) public visualizerComponentService: IVisualizerContextService,
        public sceneVisualizationComponentService: SceneVisualizationComponentService,
        private _store: Store,
        private _destroyRef: DestroyRef,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    public autoOptimizeCameraPosition() {
        const mainObject = this.scene.children.find((candidate) => candidate.userData.type === 'container') as LineSegments;
        if (!this.sceneVisualizationComponentService.camera || !mainObject) {
            return;
        }

        this._optimizeCameraPosition(mainObject, this.sceneVisualizationComponentService.camera);
    }

    public highlightGood(arg: Good | string) {
        const groups = this._store.selectSignal(selectCurrentSolutionGroups)();
        const goodId = typeof arg === 'string' ? arg : arg.id;
        const meshes = this.getGoodMeshes();

        for (const mesh of meshes) {
            const group = groups.find((group) => group.id === mesh.userData['groupId']),
                shouldHighlight = mesh.userData['goodId'] === goodId;

            (mesh.material as MeshBasicMaterial).color.set(shouldHighlight ? 'white' : 'grey');
        }
    }

    public highlightGoods(arg: Good[] | string[]) {
        const groups = this._store.selectSignal(selectCurrentSolutionGroups)();
        const goodIds = arg.map((arg) => (typeof arg === 'string' ? arg : arg.id));
        const meshes = this.getGoodMeshes();

        for (const mesh of meshes) {
            const group = groups.find((group) => group.id === mesh.userData['groupId']);
            const shouldHighlight = goodIds.indexOf(mesh.userData['goodId']) > -1;
            (mesh.material as MeshBasicMaterial).color.set(shouldHighlight ? 'yellow' : 'white');
        }
    }

    public isFixedSceneSettings(drag: CdkDrag): boolean {
        const isFixedSceneSettings = drag.element.nativeElement.classList.contains('fixed-scene-settings');
        return isFixedSceneSettings;
    }

    public move(xSteps: number, ySteps: number, zSteps: number): void {
        this.sceneVisualizationComponentService.move(xSteps, ySteps, zSteps);
        this._changeDetectorRef.markForCheck();
    }

    public moveSceneSettings(direction: 'top' | 'right' | 'bottom' | 'left' | 'none'): void {
        this.displaySceneSettingsDirection.set(direction);
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['scene']) {
            this.tryToRender();
        }
    }

    public putSceneSettingsOnScene() {
        this.moveSceneSettings('none');
    }

    public ngOnInit(): void {
        this.tryToRender();

        this._sceneRendered.pipe(takeUntilDestroyed(this._destroyRef), debounceTime(1500)).subscribe((arg) => this.sceneRendered.emit(arg));
        this.resized$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => this.onResize());

        if (this.visualizerComponentService) {
            this.visualizerComponentService.reRenderingTriggered$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this.tryToRender());
        }
    }

    public async resetCameraPosition() {
        this.sceneVisualizationComponentService.setDefaultCameraPosition();
        await firstValueFrom(timer(50));

        this.autoOptimizeCameraPosition();
    }

    public tryToRender() {
        if (!this.scene || !this.visualizerWrapperRef) {
            return;
        }

        const canvas = this.sceneVisualizationComponentService.setScreenDimensions(
            this.visualizerWrapperRef.nativeElement.clientHeight,
            this.visualizerWrapperRef.nativeElement.clientWidth
        );

        this.visualizerWrapperRef.nativeElement.appendChild(canvas);
        this.sceneVisualizationComponentService.renderScene(this.scene);
        this._sceneRendered.next({ canvas: canvas });
        this.autoOptimizeCameraPosition();
    }

    public updateSize() {
        this.sceneVisualizationComponentService.updateSize(this.visualizerWrapperRef.nativeElement.clientHeight, this.visualizerWrapperRef.nativeElement.clientWidth);
    }

    public async onClick(event: MouseEvent) {
        if (!this.interactable()) {
            return;
        }

        const hoveredElement = this.sceneVisualizationComponentService.getPointedElement(event, this.scene);
        if (!hoveredElement || !hoveredElement.object.userData['goodId']) {
            await this.resetGoodColors();
            this._hoveredGoodId.next(null);
            this.hoveredGood.emit(null);
            this.selectGood.emit(null);
            if (this.visualizerComponentService) {
                this.visualizerComponentService.selectGood(null);
            }
            
            return;
        }

        const goodId = hoveredElement.object.userData['goodId'];
        await this.highlightGood(goodId);

        this._hoveredGoodId.next(goodId);
        this.hoveredGood.emit(goodId);
        this.selectGood.emit(goodId);
        if (this.visualizerComponentService) {
            this.visualizerComponentService.selectGoodById(goodId);
        }
    }

    public async onMousemove(event: MouseEvent) {
        if (!this.interactable()) {
            return;
        }

        const hoveredElement = this.sceneVisualizationComponentService.getPointedElement(event, this.scene);
        if (!hoveredElement || !hoveredElement.object.userData['goodId']) {
            await this.resetGoodColors();
            this._hoveredGoodId.next(null);
            this.hoveredGood.emit(null);
            if (this.visualizerComponentService) {
                this.visualizerComponentService.hoverGood(null);
            }

            return;
        }

        const goodId = hoveredElement.object.userData['goodId'];
        await this.highlightGood(goodId);

        this._hoveredGoodId.next(goodId);
        this.hoveredGood.emit(goodId);
        if (this.visualizerComponentService) {
            this.visualizerComponentService.hoverGoodById(goodId);
        }
    }

    public zoomIn() {
        this.sceneVisualizationComponentService.zoomIn();
        this._changeDetectorRef.markForCheck();
    }

    public zoomOut() {
        this.sceneVisualizationComponentService.zoomOut();
        this._changeDetectorRef.markForCheck();
    }

    public onResize() {
        if (!this.responsive()) {
            return;
        }

        this.sceneVisualizationComponentService.updateSize(this.visualizerWrapperRef.nativeElement.clientHeight, this.visualizerWrapperRef.nativeElement.clientWidth);
        this.autoOptimizeCameraPosition();
    }

    private _optimizeCameraPosition(mainObject: LineSegments, camera: PerspectiveCamera) {
        const calcPercentage = () => {
            const box = new Box3().setFromObject(mainObject);
            const points = [
                new Vector3(box.min.x, box.min.y, box.min.z),
                new Vector3(box.min.x, box.min.y, box.max.z),
                new Vector3(box.min.x, box.max.y, box.min.z),
                new Vector3(box.min.x, box.max.y, box.max.z),
                new Vector3(box.max.x, box.min.y, box.min.z),
                new Vector3(box.max.x, box.min.y, box.max.z),
                new Vector3(box.max.x, box.max.y, box.min.z),
                new Vector3(box.max.x, box.max.y, box.max.z)
            ];


            const width = window.innerWidth;
            const height = window.innerHeight;

            const toScreenPosition = (point: Vector3, camera: PerspectiveCamera) => {
                const vector = point.clone().project(camera);
                vector.x = (vector.x + 1) / 2 * width;
                vector.y = -(vector.y - 1) / 2 * height;
                return vector;
            };

            const screenPoints = points.map(point => toScreenPosition(point, camera));

            const minX = Math.min(...screenPoints.map(p => p.x));
            const maxX = Math.max(...screenPoints.map(p => p.x));
            const minY = Math.min(...screenPoints.map(p => p.y));
            const maxY = Math.max(...screenPoints.map(p => p.y));

            const objectScreenWidth = maxX - minX;
            const objectScreenHeight = maxY - minY;

            const objectScreenArea = objectScreenWidth * objectScreenHeight;
            const screenArea = width * height;

            return (objectScreenArea / screenArea) * 100;
        }

        interval(10)
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                map((iteration) => ({ iteration, percentage: calcPercentage() })),
                takeWhile(({ iteration, percentage }) => iteration < 50 && (percentage < 50 || percentage > 60))
            )
            .subscribe(({ percentage }) => percentage < 50 ? this.zoomIn() : this.zoomOut());
    }

    private resetGoodColors() {
        const groups = this._store.selectSignal(selectCurrentSolutionGroups)();
        const meshes = this.getGoodMeshes();
        for (const mesh of meshes) {
            const group = groups.find((group) => group.id === mesh.userData['groupId']);
            (mesh.material as MeshBasicMaterial).color.set('white');
        }
    }

    private getGoodMeshes = () => this.scene.children.filter((candidate) => candidate instanceof Mesh && candidate.userData['goodId']) as Mesh[];
}
