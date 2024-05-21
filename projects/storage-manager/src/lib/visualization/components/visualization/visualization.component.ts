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

@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrl: './visualization.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [VisualizationService],
    animations: [fadeInAnimation]
})
export class VisualizationComponent implements OnInit {
    public displaySceneInformation = signal<boolean>(false);
    public displayBaseGrid = signal<boolean>(true);
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
        toObservable(this.wallTexture)
    ])
        .pipe(
            scan(
                (scene: Scene, [solutionWrapper, displayBaseGrid, animationStepIndex, labelObjectSites, wallObjectSites, wallTexture]) => {
                    if (solutionWrapper) {
                        if (animationStepIndex === null) this._visualizationService.configureSolutionScene(
                            solutionWrapper.solution,
                            scene,
                            solutionWrapper.groups,
                            '#f8f8f8',
                            displayBaseGrid,
                            true,
                            labelObjectSites,
                            wallObjectSites,
                            wallTexture
                        );
                        else this._visualizationService.configureSolutionStepScene(
                            scene,
                            solutionWrapper.solution.container,
                            solutionWrapper.groups,
                            solutionWrapper.calculationSteps,
                            animationStepIndex,
                            undefined,
                            true,
                            true,
                            labelObjectSites,
                            wallObjectSites,
                            wallTexture
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
        private _visualizationService: VisualizationService,
        private _destroyRef: DestroyRef
    ) { }

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
        // debugging only
        this._store.dispatch(setSolution({
            solutionWrapper: {
                groups: [
                    {
                        id: '1',
                        color: '#ff0000',
                        desc: 'Cloths',
                        sequenceNumber: 0
                    },
                    {
                        id: '2',
                        color: '#00ff00',
                        desc: 'Dishes',
                        sequenceNumber: 1
                    },
                    {
                        id: '3',
                        color: '#0000ff',
                        desc: 'Supply',
                        sequenceNumber: 2
                    },
                ],
                solution: {
                    calculated: new Date().toISOString(),
                    calculationSource: {
                        title: 'Super Flo'
                    },
                    container: {
                        goods: [
                            {
                                group: '1',
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 0,
                                length: 500,
                                width: 500,
                                height: 200,
                                sequenceNr: 0,
                                desc: "shirt"
                            },
                            {
                                group: '1',
                                xCoord: 0,
                                yCoord: 200,
                                zCoord: 0,
                                length: 500,
                                width: 500,
                                height: 200,
                                sequenceNr: 0,
                                desc: "shirt"
                            },
                            {
                                group: '1',
                                xCoord: 0,
                                yCoord: 400,
                                zCoord: 0,
                                length: 500,
                                width: 500,
                                height: 200,
                                sequenceNr: 0,
                                desc: "shirt"
                            },
                            {
                                group: '1',
                                xCoord: 0,
                                yCoord: 600,
                                zCoord: 0,
                                length: 500,
                                width: 500,
                                height: 200,
                                sequenceNr: 0,
                                desc: "shirt"
                            },
                            {
                                group: '1',
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 500,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 1,
                                desc: "jeans"
                            },
                            {
                                group: '1',
                                xCoord: 0,
                                yCoord: 500,
                                zCoord: 500,
                                length: 500,
                                width: 500,
                                height: 100,
                                sequenceNr: 1,
                                desc: "jeans abcdefghijklmnopqrstuvwxyz"
                            },
                            {
                                group: '2',
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 1000,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 2,
                                desc: "glas"
                            },
                            {
                                group: '2',
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 1500,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 3,
                                desc: "Good 4"
                            },
                            {
                                group: '3',
                                xCoord: 500,
                                yCoord: 0,
                                zCoord: 0,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 6,
                                desc: "Good 5"
                            },
                            {
                                group: '3',
                                xCoord: 500,
                                yCoord: 500,
                                zCoord: 0,
                                length: 500,
                                width: 200,
                                height: 100,
                                sequenceNr: 6,
                                desc: "Good 5"
                            }
                        ],
                        length: 2000,
                        width: 1000,
                        height: 1000,
                        xCoord: 0,
                        yCoord: 0,
                        zCoord: 0
                    },
                    description: 'Super Flo Solution'
                },
                calculationSteps: [
                    {
                        sequenceNumber: 0,
                        messages: ['Step 1', 'Calculated'],
                        positions: [
                            {
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 0,
                                length: 500,
                                width: 500,
                                height: 500,
                                fCoord: 500,
                                groupRestrictedBy: 0,
                                index: 1,
                                points: [],
                                rCoord: 500,
                                tCoord: 500,
                                usedPositions: [],
                                goodDesc: 'Good 4',
                                goodId: 4,
                                groupId: '1'
                            }
                        ]
                    },
                    {
                        sequenceNumber: 1,
                        messages: ['Step 2'],
                        positions: [
                            {
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 500,
                                length: 500,
                                width: 500,
                                height: 500,
                                fCoord: 500,
                                groupRestrictedBy: 0,
                                index: 2,
                                points: [],
                                rCoord: 500,
                                tCoord: 500,
                                usedPositions: [],
                                goodDesc: 'Good 4',
                                goodId: 4,
                                groupId: '1'
                            }
                        ]
                    },
                    {
                        sequenceNumber: 2,
                        messages: ['Step 3'],
                        positions: [
                            {
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 1000,
                                length: 500,
                                width: 500,
                                height: 500,
                                fCoord: 500,
                                groupRestrictedBy: 0,
                                index: 3,
                                points: [],
                                rCoord: 500,
                                tCoord: 500,
                                usedPositions: [],
                                goodDesc: 'Good 4',
                                goodId: 4,
                                groupId: '2'
                            }
                        ]
                    },
                    {
                        sequenceNumber: 3,
                        messages: ['Step 4'],
                        positions: [
                            {
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 1500,
                                length: 500,
                                width: 500,
                                height: 500,
                                fCoord: 500,
                                groupRestrictedBy: 0,
                                index: 4,
                                points: [],
                                rCoord: 500,
                                tCoord: 500,
                                usedPositions: [],
                                goodDesc: 'Good 4',
                                goodId: 4,
                                groupId: '3'
                            }
                        ]
                    }
                ]
            } as any
        }));
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
