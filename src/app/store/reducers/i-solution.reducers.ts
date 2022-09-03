import { createReducer, MetaReducer, on, Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { InjectionToken } from '@angular/core';
import {
  addSolution,
  addSolutions,
  duplicateSolution,
  removeSolution,
  setCurrentSolution,
} from '../actions/i-solution.actions';
import { v4 as generateGuid } from 'uuid';
import * as moment from 'moment';
import { ISolution } from 'src/app/interfaces/i-solution.interface';

export const solutionFeatureKey = 'solution';

export const SOLUTION_REDUCER_TOKEN = new InjectionToken<Store<State>>(
  'Solution Reducers'
);

export interface State extends EntityState<ISolution> {
  selectedSolutionId: string | null;
  ids: string[];
}

export const adapter: EntityAdapter<ISolution> = createEntityAdapter<ISolution>(
  {
    selectId: (solution) => solution.id,
    sortComparer: (solution1, solution2) =>
      solution1.id > solution2.id ? 1 : -1,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedSolutionId: null,
  entities: {},
  ids: [],
});

export const solutionReducer = createReducer(
  initialState,
  on(addSolution, (state, { solution }) => {
    return adapter.addOne(
      {
        ...solution,
        id: solution.id ?? generateGuid()
      },
      state
    );
  }),
  on(addSolutions, (state, { solutions }) => {
    return adapter.addMany(
      solutions.map((solution, index) => {
        return {
          ...solution,
          addedToState: moment().format(),
          index: index,
        };
      }),
      state
    );
  }),
  on(duplicateSolution, (state, { duplicateSolution }) => {
    if (!duplicateSolution) {
      return state;
    }
    return adapter.addOne({ ...duplicateSolution, id: generateGuid() }, state);
  }),
  on(removeSolution, (state, { removeSolution }) => {
    if (!removeSolution) {
      return state;
    }
    return adapter.removeOne(removeSolution.id, state);
  }),
  on(setCurrentSolution, (currentState, { solution }) => {
    const state = {
      ...currentState,
      selectedSolutionId: solution?.id ?? null,
      selectedSolutionIndex: solution
        ? currentState.ids.findIndex((id) => id === solution.id)
        : null,
    };
    return state;
  })
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
