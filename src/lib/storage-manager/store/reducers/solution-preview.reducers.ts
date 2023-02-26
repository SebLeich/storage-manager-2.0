import { createReducer, on } from '@ngrx/store';

import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ISolutionPreview } from 'src/lib/storage-manager-store/interfaces/solution-preview.interface';
import { announceSolutionPreview, upsertSolutionPreview } from '../actions/solution-preview.actions';
import { SolutionPreviewStatus } from 'src/app/enumerations/solution-preview-status.enumeration';

export const solutionPreviewFeatureKey = 'solutionPreview';

export interface State extends EntityState<ISolutionPreview> {
  ids: string[];
}

export const adapter = createEntityAdapter<ISolutionPreview>(
  {
    selectId: (solutionPreview) => solutionPreview.solutionId,
    sortComparer: (solutionPreviewA, solutionPreview) => solutionPreviewA.solutionId > solutionPreview.solutionId ? 1 : -1,
  }
);

export const initialState: State = adapter.getInitialState({
  entities: {},
  ids: [],
});


export const reducer = createReducer(
  initialState,

  on(announceSolutionPreview, (state, { solutionId }) => {
    if (state.ids.indexOf(solutionId) === -1) {
      return adapter.addOne({ solutionId: solutionId, status: SolutionPreviewStatus.Generating }, state);
    }
    return state;
  }),

  on(upsertSolutionPreview, (state, { solutionPreview }) => {
    return adapter.upsertOne(solutionPreview, state);
  }),
);
