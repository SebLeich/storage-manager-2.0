import { createReducer, MetaReducer, on } from '@ngrx/store';

import defaultSolution from 'src/assets/exampleSolution.json';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import {
  addSolution,
  addSolutions,
  duplicateSolution,
  setDefaultSolution,
  removeSolution,
  setCurrentSolution,
  setNextSolution,
  updateCurrentSolutionGroupColor,
  clearSolutions,
  updateAlgorithmSolution,
  updateSolution,
} from '../actions/i-solution.actions';
import { v4 as generateGuid } from 'uuid';
import * as moment from 'moment';
import { ISolution } from 'src/app/interfaces/i-solution.interface';

export const solutionFeatureKey = 'solution';

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
        id: solution.id ?? generateGuid(),
        calculated: solution.calculated ?? moment().format()
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

  on(clearSolutions, () => {
    return initialState;
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
    if (solution) {
      let solutionIndex = Object.values(currentState.entities).findIndex((currentSolution) => currentSolution?.id === solution.id);
      if (solutionIndex === -1) {
        state = adapter.addOne(solution, currentState);
        solutionIndex = Object.values(currentState.entities).findIndex((currentSolution) => currentSolution?.id === solution.id);
      }
      return { ...state, selectedSolutionId: solution.id, selectedSolutionIndex: solutionIndex };
    } else {
      return { ...state, selectedSolutionId: null, selectedSolutionIndex: null };
    }
  }),

  on(setDefaultSolution, () => {
    let entities: { [key: string]: ISolution } = {};
    entities[defaultSolution.id] = defaultSolution as any;
    return {
      entities: entities,
      ids: [defaultSolution.id],
      selectedSolutionId: defaultSolution.id
    }
  }),

  on(setNextSolution, (currentState) => {
    if (Object.values(currentState.entities).length === 0) {
      return currentState;
    }
    let nextSolutionIndex = typeof currentState.selectedSolutionId === 'string' ? Object.values(currentState.entities).findIndex((currentSolution) => currentSolution?.id === currentState.selectedSolutionId) + 1 : 0;
    if (nextSolutionIndex === Object.values(currentState.entities).length) {
      nextSolutionIndex = 0;
    }
    const nextSolution = Object.values(currentState.entities)[nextSolutionIndex];
    return { ...currentState, selectedSolutionId: nextSolution!.id };
  }),

  on(updateAlgorithmSolution, (currentState, { solution }) => {
    const existingSolutionIndex: number = Object.values(currentState.entities).findIndex(currentSolution => solutionCalculationSourcesMatch(currentSolution, solution));
    const existingSolution: null | ISolution | undefined = existingSolutionIndex > -1 ? Object.values(currentState.entities)[existingSolutionIndex] : null;
    const entities: { [key: string]: ISolution } = {};
    for (let currentSolution of Object.values(currentState.entities)) {
      if (currentSolution === existingSolution) {
        entities[solution.id] = solution;
      } else {
        entities[currentSolution!.id] = currentSolution!;
      }
    }
    if (!existingSolution) {
      entities[solution.id] = solution;
    }
    return {
      selectedSolutionId: existingSolution && currentState.selectedSolutionId === existingSolution!.id ? solution.id : currentState.selectedSolutionId,
      entities: entities,
      ids: Object.keys(entities)
    };
  }),

  on(updateCurrentSolutionGroupColor, (currentState, { group, color }) => {
    let state: State = { ...currentState };
    if (typeof currentState.selectedSolutionId === 'string') {
      const updatedGroups = currentState.entities[currentState.selectedSolutionId]!.groups?.map(currentGroup => {
        return currentGroup === group ? { ...group, color: color } : currentGroup;
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
  }),

  on(updateSolution, (currentState, { solution }) => {
    const update = {
      id: solution.id,
      changes: {
        description: solution.description,
        calculationSource: solution.calculationSource
      }
    } as Update<ISolution>;
    return adapter.updateOne(update, currentState);
  })
);

function solutionCalculationSourcesMatch(solution1: ISolution | null | undefined, solution2: ISolution | null | undefined) {
  if (!!solution1?.calculationSource?.staticAlgorithm || !!solution2?.calculationSource?.staticAlgorithm) {
    return false;
  }
  return solution1!.calculationSource!.staticAlgorithm === solution2!.calculationSource!.staticAlgorithm;
}
