import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSolution, updateGroup } from '../../store/visualization.actions';
import { scan } from 'rxjs';
import { VisualizationService } from '../../services/visualization/visualization.service';
import { selectCurrentSolutionWrapper } from '../../store/visualization.selectors';

import { Scene } from 'three';
import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { Group } from '@/lib/storage-manager/types/group.type';
import { fadeInAnimation } from '@/lib/shared/animations/fade-in.animation';


@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrl: './visualization.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [VisualizationService],
    animations: [fadeInAnimation]
})
export class VisualizationComponent implements OnInit {
    public solutionWrapper$ = this._store.select(selectCurrentSolutionWrapper);
    public scene$ = this.solutionWrapper$
        .pipe(
            scan(
                (scene: Scene, solutionWrapper: SolutionWrapper | null) => {
                    if (solutionWrapper) {
                        this._visualizationService.configureSolutionScene(solutionWrapper.solution, scene, solutionWrapper.groups, '#f8f8f8');
                    }

                    return scene;
                },
                new Scene()
            )
        );

    constructor(private _store: Store, private _visualizationService: VisualizationService) { }

    public ngOnInit(): void {
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
                                group: '2',
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 2000,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 4,
                                desc: "Good 5"
                            },
                            {
                                group: '2',
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 2200,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 5,
                                desc: "Good 6"
                            },
                            {
                                group: '3',
                                xCoord: 500,
                                yCoord: 0,
                                zCoord: 0,
                                length: 2500,
                                width: 2500,
                                height: 2500,
                                sequenceNr: 6,
                                desc: "Good 7"
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
                    { createdPositions: [], messages: [], sequenceNumber: 0, usedPosition: null },
                ]
            } as any
        }));
    }

    public updateGroup(group: Group) {
        this._store.dispatch(updateGroup({ group }));
    }

}
