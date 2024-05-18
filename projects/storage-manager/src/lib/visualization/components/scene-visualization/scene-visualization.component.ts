import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, ElementRef, EventEmitter, Inject, Input, OnChanges, OnInit, Optional, Output, SimpleChanges, ViewChild, input } from '@angular/core';
import { BehaviorSubject, debounceTime, fromEvent, map, ReplaySubject, switchMap } from 'rxjs';
import { Mesh, Scene } from 'three';
import { MeshBasicMaterial } from 'three';
import { Store } from '@ngrx/store';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { IVisualizerContextService, VISUALIZER_CONTEXT } from 'src/app/interfaces/i-visualizer-context.service';
import { selectCurrentSolutionGoods, selectGroups } from '@smgr/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SceneVisualizationComponentService } from './service/scene-visualization-component.service';
import { Good } from '@/lib/storage-manager/types/good.type';

@Component({
    selector: 'app-scene-visualization',
    templateUrl: './scene-visualization.component.html',
    styleUrls: ['./scene-visualization.component.scss'],
    providers: [SceneVisualizationComponentService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneVisualizationComponent implements OnChanges, OnInit {
    @ViewChild('visualizationWrapper', { static: true })
    public visualizerWrapperRef!: ElementRef<HTMLDivElement>;

    @Input() public scene!: Scene;
    @Input() public responsive = true;
    @Input() public interactable = true;

    @Output() public sceneRendered = new EventEmitter<{ canvas: HTMLCanvasElement }>();
    @Output() public hoveredGood = new EventEmitter<string | null>();
    @Output() public selectGood = new EventEmitter<string | null>();

    public displaySceneInformation = input<boolean>(true);

    public resized$ = fromEvent(window, 'resize').pipe(debounceTime(50));

    private _hoveredGoodId = new BehaviorSubject<null | string>(null);
    public hoveredGood$ = this._hoveredGoodId.pipe(
        switchMap((goodId) =>
            this._store
                .select(selectCurrentSolutionGoods)
                .pipe(map((goods) => goods.find((good) => good.id === goodId)))
        )
    );

    private _sceneRendered = new ReplaySubject<{ canvas: HTMLCanvasElement }>(1);

    constructor(
        @Optional() @Inject(VISUALIZER_CONTEXT) public visualizerComponentService: IVisualizerContextService,
        public sceneVisualizationComponentService: SceneVisualizationComponentService,
        private _store: Store,
        private _destroyRef: DestroyRef,
        private _changeDetectorRef: ChangeDetectorRef
    ) { }

    public async highlightGood(arg: Good | string) {
        const groups = await selectSnapshot(this._store.select(selectGroups));
        const goodId = typeof arg === 'string' ? arg : arg.id;
        const meshes = this.getGoodMeshes();

        for (const mesh of meshes) {
            const group = groups.find((group) => group.id === mesh.userData['groupId']);
            (mesh.material as MeshBasicMaterial).color.set(mesh.userData['goodId'] === goodId ? 'white' : group?.color ?? 'black');
        }
    }

    public async highlightGoods(arg: Good[] | string[]) {
        const groups = await selectSnapshot(this._store.select(selectGroups));
        const goodIds = arg.map((arg) => (typeof arg === 'string' ? arg : arg.id));
        const meshes = this.getGoodMeshes();

        for (const mesh of meshes) {
            const group = groups.find((group) => group.id === mesh.userData['groupId']);
            const shouldHighlight = goodIds.indexOf(mesh.userData['goodId']) > -1;
            (mesh.material as MeshBasicMaterial).color.set(shouldHighlight ? 'white' : group?.color ?? 'black');
        }
    }

    public move(xSteps: number, ySteps: number, zSteps: number): void {
        this.sceneVisualizationComponentService.move(xSteps, ySteps, zSteps);
        this._changeDetectorRef.markForCheck();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['scene']) {
            this.tryToRender();
        }
    }

    public ngOnInit(): void {
        this.tryToRender();

        this._sceneRendered.pipe(takeUntilDestroyed(this._destroyRef), debounceTime(1500)).subscribe((arg) => this.sceneRendered.emit(arg));
        this.resized$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this.onResize());

        if (this.visualizerComponentService) {
            this.visualizerComponentService.reRenderingTriggered$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this.tryToRender());
        }
    }

    public tryToRender() {
        if (this.scene && this.visualizerWrapperRef) {
            const canvas =
                this.sceneVisualizationComponentService.setScreenDimensions(
                    this.visualizerWrapperRef.nativeElement.clientHeight,
                    this.visualizerWrapperRef.nativeElement.clientWidth
                );
            this.visualizerWrapperRef.nativeElement.appendChild(canvas);
            this.sceneVisualizationComponentService.renderScene(this.scene);
            this._sceneRendered.next({ canvas: canvas });
        }
    }

    public updateSize() {
        this.sceneVisualizationComponentService.updateSize(this.visualizerWrapperRef.nativeElement.clientHeight, this.visualizerWrapperRef.nativeElement.clientWidth);
    }

    public async onClick(event: MouseEvent) {
        if (!this.interactable) {
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
        if (!this.interactable) {
            return;
        }

        const hoveredElement =
            this.sceneVisualizationComponentService.getPointedElement(
                event,
                this.scene
            );
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
        this._changeDetectorRef. markForCheck();
    }

    public zoomOut() {
        this.sceneVisualizationComponentService.zoomOut();
        this._changeDetectorRef. markForCheck();
    }

    private onResize() {
        if (!this.responsive) {
            return;
        }

        this.sceneVisualizationComponentService.updateSize(this.visualizerWrapperRef.nativeElement.clientHeight, this.visualizerWrapperRef.nativeElement.clientWidth);
    }

    private async resetGoodColors() {
        const groups = await selectSnapshot(this._store.select(selectGroups));
        const meshes = this.getGoodMeshes();
        for (const mesh of meshes) {
            const group = groups.find((group) => group.id === mesh.userData['groupId']);
            (mesh.material as MeshBasicMaterial).color.set(group?.color ?? 'black');
        }
    }

    private getGoodMeshes = () => this.scene.children.filter((candidate) => candidate instanceof Mesh && candidate.userData['goodId']) as Mesh[];
}
