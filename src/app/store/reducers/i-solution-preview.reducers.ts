import { createReducer, on } from '@ngrx/store';

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ISolution } from 'src/app/interfaces/i-solution.interface';
import { ISolutionPreview } from 'src/app/interfaces/i-solution-preview.interface';
import { upsertSolutionPreview } from '../actions/i-solution-preview.actions';

export const solutionPreviewFeatureKey = 'solutionPreview';

export interface State extends EntityState<ISolution> {
  selectedSolutionId: string | null;
  ids: string[];
}

export const adapter = createEntityAdapter<ISolutionPreview>(
  {
    selectId: (solutionPreview) => solutionPreview.solutionId,
    sortComparer: (solutionPreviewA, solutionPreview) =>
    solutionPreviewA.solutionId > solutionPreview.solutionId ? 1 : -1,
  }
);

export const initialState = adapter.getInitialState({
  entities: {},
  ids: [],
});


export const solutionReducer = createReducer(
  initialState,

  on(upsertSolutionPreview, (state, { solutionPreview }) => {
    return adapter.upsertOne(solutionPreview, state);
  }),
);
