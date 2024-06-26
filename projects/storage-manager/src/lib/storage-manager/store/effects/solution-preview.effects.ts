import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSolutionPreview, upsertSolutionPreview } from '../actions/solution-preview.actions';
import { of, switchMap, map, combineLatest } from 'rxjs';
import { SolutionPreviewStatus } from 'src/app/enumerations/solution-preview-status.enumeration';
import { Store } from '@ngrx/store';
import { selectSolutionById } from '../selectors/solution.selectors';
import { selectGroups } from '../selectors/group.selectors';
import { ISolutionPreview } from '../../interfaces/solution-preview.interface';
import { VisualizationService } from '@/lib/visualization/services/visualization/visualization.service';

import * as ThreeJS from 'three';
import { ThreeDCalculationService } from '@/lib/shared/services/three-d-calculation.service';
import { v4 } from 'uuid';

@Injectable()
export class ISolutionPreviewEffects {

    public loadSolutionPreview$ = createEffect(() => this._actions$.pipe(
        ofType(loadSolutionPreview),
        switchMap(({ arg }) => {
            let obs = typeof arg === 'string' ? this._store.select(selectSolutionById(arg)) : of(arg);
            return combineLatest([obs, this._store.select(selectGroups)]);
        }),
        map(([solution, groups]) => {
            const scene = new ThreeJS.Scene();
            scene.background = new ThreeJS.Color('rgb(255,255,255)');

            const containerPosition = ThreeDCalculationService.spatialPositionedToUnusedPosition(ThreeDCalculationService.calculateSpatialPosition(solution!.container!));
            const containerResult = VisualizationService.generateOutlinedBoxMesh({ ...containerPosition, id: v4() }, 'container');
            scene.add(containerResult.edges);

            for (let good of solution!.container!.goods) {
                const goodPosition = ThreeDCalculationService.spatialPositionedToUnusedPosition(ThreeDCalculationService.calculateSpatialPosition(good));
                const goodResult = VisualizationService.generateFilledBoxMesh({ ...goodPosition, id: v4() }, 'good', containerPosition);
                scene.add(goodResult.edges, goodResult.mesh);
            }

            // @ts-ignore
            const ref = this._viewContainerRef.createComponent(SceneVisualizationComponent);
            ref.instance.scene = scene;

            const image = ref.instance.currentCanvas?.toDataURL();

            const solutionPreview: ISolutionPreview = {
                solutionId: solution!.id,
                status: SolutionPreviewStatus.Succeeded,
                dataURL: image
            };

            return upsertSolutionPreview({ solutionPreview: solutionPreview })
        })
    ));

    constructor(private _actions$: Actions, private _store: Store) { }

}