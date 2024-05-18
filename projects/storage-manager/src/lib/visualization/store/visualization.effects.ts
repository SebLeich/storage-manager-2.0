import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setSolution, setSolutionValidation } from './visualization.actions';
import { ValidationService } from '../services/validation/validation.service';
import { map } from 'rxjs/operators';



@Injectable()
export class VisualizationEffects {

    public onSetCurrentSolutionWrapper = createEffect(
        () => this.actions$
            .pipe(
                ofType(setSolution),
                map(({ solutionWrapper }) => {
                    const validation = solutionWrapper ? ValidationService.validateSolution(solutionWrapper?.solution) : [];
                    return setSolutionValidation({ validation });
                })
            ));

    constructor(
        private actions$: Actions
    ) { }

}