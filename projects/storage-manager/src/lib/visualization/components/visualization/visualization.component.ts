import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSolution, updateGroup } from '../../store/visualization.actions';
import { combineLatest, firstValueFrom, scan } from 'rxjs';
import { VisualizationService } from '../../services/visualization/visualization.service';
import { selectCurrentSolutionWrapper } from '../../store/visualization.selectors';
import { Scene } from 'three';
import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { Group } from '@/lib/storage-manager/types/group.type';
import { fadeInAnimation } from '@/lib/shared/animations/fade-in.animation';
import { toObservable } from '@angular/core/rxjs-interop';



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

    public solutionWrapper$ = this._store.select(selectCurrentSolutionWrapper);
    public scene$ = combineLatest([this.solutionWrapper$, toObservable(this.displayBaseGrid), toObservable(this.animationStepIndex)])
        .pipe(
            scan(
                (scene: Scene, [solutionWrapper, displayBaseGrid, animationStepIndex]: [SolutionWrapper | null, boolean, number | null]) => {
                    if (solutionWrapper) {
                        if (animationStepIndex === null) this._visualizationService.configureSolutionScene(
                            solutionWrapper.solution,
                            scene,
                            solutionWrapper.groups,
                            '#f8f8f8',
                            displayBaseGrid
                        );
                        else this._visualizationService.configureSolutionStepScene(
                            scene,
                            solutionWrapper.solution.container,
                            solutionWrapper.calculationSteps,
                            animationStepIndex
                        );
                    }

                    return scene;
                },
                new Scene()
            )
        );

    constructor(private _store: Store, private _visualizationService: VisualizationService) { }

    public async nextStep(): Promise<void> {
        const currentStepIndex = this.animationStepIndex(),
            solutionWrapper = await firstValueFrom(this.solutionWrapper$);

        if (!solutionWrapper?.calculationSteps.length) return;

        const stepCount = solutionWrapper.calculationSteps.length;
        const nextStepIndex = currentStepIndex == null ? 0 : Math.min(currentStepIndex + 1, stepCount - 1);

        this.animationStepIndex.set(nextStepIndex);
    }

    public ngOnInit(): void {
        // debugging only
        this._store.dispatch(setSolution({
            solutionWrapper: {
                groups: [
                    {
                        id: '1',
                        color: '#ff0000',
                        desc: 'Group 1',
                        sequenceNumber: 0
                    },
                    {
                        id: '2',
                        color: '#00ff00',
                        desc: 'Group 2',
                        sequenceNumber: 1
                    },
                    {
                        id: '3',
                        color: '#0000ff',
                        desc: 'Group 3',
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
                                height: 500,
                                sequenceNr: 0,
                                desc: "Good 1"
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
                                desc: "Good 2"
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
                                desc: "Good 3"
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
                                usedPositions: []
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
                                zCoord: 0,
                                length: 500,
                                width: 500,
                                height: 500,
                                fCoord: 500,
                                groupRestrictedBy: 0,
                                index: 2,
                                points: [],
                                rCoord: 500,
                                tCoord: 500,
                                usedPositions: []
                            }
                        ]
                    },
                    { sequenceNumber: 2, messages: ['Step 3'], positions: [] },
                    { sequenceNumber: 3, messages: ['Step 4'], positions: [] },
                ]
            } as any
        }));
    }

    public updateGroup(group: Group) {
        this._store.dispatch(updateGroup({ group }));
    }

    public startAnimation(): void {
        const currentStepIndex = this.animationStepIndex();
        this.animationStepIndex.set(currentStepIndex == null ? 0 : currentStepIndex + 1);
    }

    public stopAnimation(): void {
        this.animationStepIndex.set(null);
    }

}
