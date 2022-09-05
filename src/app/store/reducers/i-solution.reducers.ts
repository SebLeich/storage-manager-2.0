import { createReducer, MetaReducer, on, Store } from '@ngrx/store';

import defaultSolution from 'src/assets/exampleSolution.json';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { InjectionToken } from '@angular/core';
import {
  addSolution,
  addSolutions,
  duplicateSolution,
  removeSolution,
  setCurrentSolution,
  updateCurrentSolutionGroupColor,
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

let entities = {};
(entities as any)[defaultSolution.id] = defaultSolution;
export const initialState: State = adapter.getInitialState({
  selectedSolutionId: defaultSolution.id,
  entities: entities,
  ids: [defaultSolution.id],
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
    let state: State = currentState;
    if(solution){
      let solutionIndex = Object.values(currentState.entities).findIndex((currentSolution) => currentSolution?.id === solution.id);
      if(solutionIndex === -1){
        state = adapter.addOne(solution, currentState);
        solutionIndex = Object.values(currentState.entities).findIndex((currentSolution) => currentSolution?.id === solution.id);
      }
      return { ...state, selectedSolutionId: solution.id, selectedSolutionIndex: solutionIndex };
    } else {
      return { ...state, selectedSolutionId: null, selectedSolutionIndex: null };
    }
  }),

  on(updateCurrentSolutionGroupColor, (currentState, { group, color }) => {
    let state: State = { ...currentState };
    if (typeof currentState.selectedSolutionId === 'string') {
      const updatedGroups = currentState.entities[currentState.selectedSolutionId]!.groups?.map(currentGroup => {
        return currentGroup === group? { ...group, color: color }: currentGroup;
      }) ?? [];
      const updateCommand: Update<ISolution> = {
        'id': currentState.selectedSolutionId,
        'changes': {
          'groups': updatedGroups
        }
      }
      return adapter.updateOne(updateCommand, currentState);
    }
    return state;
  })
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
