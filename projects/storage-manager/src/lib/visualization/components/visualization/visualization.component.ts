import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSolution, updateGroup } from '../../store/visualization.actions';
import { Subscription, combineLatest, finalize, firstValueFrom, interval, scan, switchMap, take, takeWhile } from 'rxjs';
import { VisualizationService } from '../../services/visualization/visualization.service';
import { selectCurrentSolutionWrapper } from '../../store/visualization.selectors';
import { Scene } from 'three';
import { Group } from '@/lib/storage-manager/types/group.type';
import { fadeInAnimation } from '@/lib/shared/animations/fade-in.animation';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ObjectSite } from '@/lib/storage-manager/types/object-site.type';
import { WallTexture } from '@/lib/storage-manager/types/wall-texture.type';
import { DownloadService } from '@/lib/download/services/download/download.service';
import { Router } from '@angular/router';
import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrl: './visualization.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [VisualizationService],
    animations: [fadeInAnimation]
})
export class VisualizationComponent implements OnInit {
    public backgroundColor = signal<string>('#ffffff');
    public addLights = signal<boolean>(true);
    public displaySceneSettings = signal<boolean>(false);
    public displayBaseGrid = signal<boolean>(true);
    public displayContainer = signal<boolean>(true);
    public displayContainerUnloadingArrow = signal<boolean>(true);
    public displayContainerEdges = signal<boolean>(false);
    public displayEmptySpace = signal<boolean>(false);
    public displayEmptySpaceEdges = signal<boolean>(false);
    public displayGoods = signal<boolean>(true);
    public displayGoodEdges = signal<boolean>(false);
    public fillEmptySpace = signal<boolean>(false);
    public animationStepIndex = signal<number | null>(null);
    public intervalSpeed = signal<number>(1000);
    public playStatus = signal<'playing' | 'paused' | 'stopped'>('stopped');
    public labelObjectSites = signal<ObjectSite[]>(['right', 'front']);
    public wallObjectSites = signal<ObjectSite[]>(['bottom', 'rear', 'left', 'bottom']);
    public wallTexture = signal<WallTexture>('yellow');

    public solutionWrapper$ = this._store.select(selectCurrentSolutionWrapper);
    public intervalSpeed$ = toObservable(this.intervalSpeed);
    public scene$ = combineLatest([
        this.solutionWrapper$,
        toObservable(this.displayBaseGrid),
        toObservable(this.animationStepIndex),
        toObservable(this.labelObjectSites),
        toObservable(this.wallObjectSites),
        toObservable(this.wallTexture),
        toObservable(this.addLights),
        toObservable(this.backgroundColor),
        toObservable(this.displayContainer),
        toObservable(this.displayContainerUnloadingArrow),
        toObservable(this.displayContainerEdges),
        toObservable(this.displayGoodEdges),
        toObservable(this.displayGoods),
        toObservable(this.displayEmptySpace),
        toObservable(this.displayEmptySpaceEdges),
        toObservable(this.fillEmptySpace)
    ]).pipe(
        scan(
            (scene: Scene, [solutionWrapper, displayBaseGrid, animationStepIndex, labelObjectSites, wallObjectSites, wallTexture, addLights, backgroundColor, displayContainer, displayContainerUnloadingArrow, displayContainerEdges, displayGoodEdges, displayGoods, displayEmptySpace, displayEmptySpaceEdges, fillEmptySpace]) => {
                if (solutionWrapper) {
                    if (animationStepIndex === null) this._visualizationService.configureSolutionScene(
                        solutionWrapper.solution,
                        scene,
                        solutionWrapper.groups,
                        addLights,
                        backgroundColor,
                        displayBaseGrid,
                        displayContainer,
                        displayContainerUnloadingArrow,
                        labelObjectSites,
                        wallObjectSites,
                        wallTexture,
                        displayContainerEdges,
                        displayGoods,
                        displayGoodEdges,
                        displayEmptySpace,
                        displayEmptySpaceEdges,
                        fillEmptySpace
                    );
                    else this._visualizationService.configureSolutionStepScene(
                        scene,
                        solutionWrapper.solution.container,
                        solutionWrapper.groups,
                        addLights,
                        solutionWrapper.calculationSteps,
                        animationStepIndex,
                        backgroundColor,
                        displayBaseGrid,
                        displayContainer,
                        displayContainerUnloadingArrow,
                        labelObjectSites,
                        wallObjectSites,
                        wallTexture,
                        displayContainerEdges,
                        displayGoods,
                        displayGoodEdges,
                        displayEmptySpace,
                        displayEmptySpaceEdges,
                        fillEmptySpace
                    );
                }

                return scene;
            },
            new Scene()
        )
    );

    private _animationInterval: Subscription | null = null;

    constructor(
        private _store: Store,
        private _router: Router,
        private _visualizationService: VisualizationService,
        private _destroyRef: DestroyRef,
        private _downloadService: DownloadService
    ) { }

    public async downloadSolution(format: 'json' | 'xml' = 'json'): Promise<void> {
        const solutionWrapper = await firstValueFrom(this.solutionWrapper$);
        if (!solutionWrapper) return;

        if (format === 'json') {
            this._downloadService.downloadJSONContentsAsFile(solutionWrapper, 'solution.json');
        }
    }

    public async fastForward(): Promise<void> {
        const solutionWrapper = await firstValueFrom(this.solutionWrapper$);
        if (!solutionWrapper?.calculationSteps.length) return;

        this.animationStepIndex.set(solutionWrapper.calculationSteps.length - 1);
        this.pauseAnimation();
    }

    public fastRewind(): void {
        this.animationStepIndex.set(0);
        this.pauseAnimation();
    }

    public async nextStep(): Promise<void> {
        const currentStepIndex = this.animationStepIndex(),
            solutionWrapper = await firstValueFrom(this.solutionWrapper$);

        if (!solutionWrapper?.calculationSteps.length) return;

        const stepCount = solutionWrapper.calculationSteps.length;
        const nextStepIndex = currentStepIndex == null ? 0 : Math.min(currentStepIndex + 1, stepCount - 1);
        this.animationStepIndex.set(nextStepIndex);

        this.pauseAnimation();
    }

    public ngOnInit(): void {
        const { groups, calculationSteps, solution } = history.state;
        if (groups && solution) {
            const solutionWrapper = { groups, solution, calculationSteps } as SolutionWrapper;
            this._store.dispatch(setSolution({ solutionWrapper }));
        }
        else this._router.navigate(['/calculation']);
    }

    public pauseAnimation(): void {
        this._clearAnimationInterval();

        this.playStatus.set('paused');
    }

    public async previousStep(): Promise<void> {
        const currentStepIndex = this.animationStepIndex(),
            solutionWrapper = await firstValueFrom(this.solutionWrapper$);

        if (!solutionWrapper?.calculationSteps.length) return;

        const nextStepIndex = currentStepIndex == null ? 0 : Math.max(currentStepIndex - 1, 0);
        this.animationStepIndex.set(nextStepIndex);

        this.pauseAnimation();
    }

    public updateGroup(group: Group) {
        this._store.dispatch(updateGroup({ group }));
    }

    public async startAnimation(): Promise<void> {
        const currentStepIndex = this.animationStepIndex(),
            solutionWrapper = await firstValueFrom(this.solutionWrapper$);

        if (!solutionWrapper?.calculationSteps.length) return;
        if (currentStepIndex === null || solutionWrapper?.calculationSteps.length - 1 === currentStepIndex) this.animationStepIndex.set(0);
        this._clearAnimationInterval();

        this.playStatus.set('playing');

        this._animationInterval = this.intervalSpeed$
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                switchMap((intervalSpeed) => interval(intervalSpeed)),
                switchMap(() => this.solutionWrapper$.pipe(take(1))),
                takeWhile((solutionWrapper) => {
                    if (!solutionWrapper) return false;

                    const currentStepIndex = this.animationStepIndex();
                    return currentStepIndex === null || currentStepIndex < solutionWrapper.calculationSteps.length - 1;
                }),
                finalize(() => this.pauseAnimation())
            )
            .subscribe(() => this.animationStepIndex.set((this.animationStepIndex() ?? 0) + 1));
    }

    public stopAnimation(): void {
        this._clearAnimationInterval();
        this.animationStepIndex.set(null);
    }

    private _clearAnimationInterval(): void {
        if (this._animationInterval && !this._animationInterval.closed) {
            this._animationInterval.unsubscribe();
            this._animationInterval = null;
        }

        this.playStatus.set('stopped');
    }
}
