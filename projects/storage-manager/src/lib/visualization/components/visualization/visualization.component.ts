import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setSolution } from '../../store/visualization.actions';
import { scan } from 'rxjs';
import { VisualizationService } from '../../services/visualization/visualization.service';
import { Solution } from '@/lib/storage-manager/types/solution.type';
import { selectCurrentSolution } from '../../store/visualization.selectors';

import { Scene } from 'three';


@Component({
    selector: 'app-visualization',
    templateUrl: './visualization.component.html',
    styleUrl: './visualization.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [VisualizationService]
})
export class VisualizationComponent implements OnInit {
    public solution$ = this._store.select(selectCurrentSolution);
    public scene$ = this.solution$
        .pipe(
            scan(
                (scene: Scene, solution: Solution | undefined) => {
                    if (solution) {
                        this._visualizationService.configureSolutionScene(solution, scene, 'rgb(238,238,238)');
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
                solution: {
                    calculated: new Date().toISOString(),
                    calculationSource: {
                        title: 'Super Flo'
                    },
                    container: {
                        goods: [
                            {
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
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 500,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 1,
                            },
                            {
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 1000,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 2,
                            },
                            {
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 1500,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 3,
                            },
                            {
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
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 2100,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 4,
                                desc: "Good 6"
                            },
                            {
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 2200,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 4,
                                desc: "Good 7"
                            },
                            {
                                xCoord: 0,
                                yCoord: 0,
                                zCoord: 2650,
                                length: 500,
                                width: 500,
                                height: 500,
                                sequenceNr: 4,
                                desc: "Good 8"
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
                }
            } as any
        }));
    }

}
