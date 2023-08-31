import { createReducer, on } from '@ngrx/store';

import exemplarySolution from 'src/assets/exemplary-solution.json';

import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import {
  addSolution,
  addSolutions,
  duplicateSolution,
  setExemplarySolution,
  removeSolution,
  setCurrentSolution,
  setNextSolution,
  clearSolutions,
  updateAlgorithmSolution,
  updateSolution,
} from '../actions/solution.actions';
import { v4 as generateGuid } from 'uuid';
import * as moment from 'moment';
import { Unit } from 'src/app/types/unit.type';
import { ISolution } from '../../interfaces/solution.interface';

export const featureKey = 'solution';

export interface State extends EntityState<ISolution> {
  selectedSolutionId: string | null;
  ids: string[];
}

export const adapter: EntityAdapter<ISolution> = createEntityAdapter<ISolution>(
  {
    selectId: (solution) => solution.id,
    sortComparer: (solution1, solution2) => solution1.id > solution2.id ? 1 : -1,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedSolutionId: null,
  entities: {},
  ids: [],
});


export const reducer = createReducer(
  initialState,

  on(addSolution, (state, { solution }) => {
    return adapter.addOne(
      {
        id: solution.id ?? generateGuid(),
        calculated: solution.calculated ?? moment().format(),
        calculationSource: solution.calculationSource ?? {
          title: 'unknown source'
        },
        container: solution.container ?? {
          goods: [],
          xCoord: 0,
          yCoord: 0,
          zCoord: 0,
          width: 0,
          length: 0,
          height: 0,
          unit: 'mm',
          id: generateGuid()
        },
        steps: [],
        description: solution.description ?? null
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

  on(setExemplarySolution, () => {
    let entities: { [key: string]: ISolution } = {};
    entities[exemplarySolution.solution.id] = {
      ...exemplarySolution.solution,
      container: {
        ...exemplarySolution.solution.container,
        unit: exemplarySolution.solution.container.unit as Unit,
        goods: [...exemplarySolution.solution.container.goods.map(good => ({
          ...good,
          fCoord: good.fCoord === null ? Infinity : good.fCoord
        }))],
      },
      steps: [
        ...exemplarySolution.solution.steps.map(step => ({
          ...step,
          usedPosition: step.usedPosition ? {
            ...step.usedPosition,
            fCoord: step.usedPosition.fCoord === null ? Infinity : step.usedPosition.fCoord,
            length: step.usedPosition.length === null ? Infinity : step.usedPosition.length,
            groupRestrictedBy: step.usedPosition.groupRestrictedBy ?? null
          } : undefined,
          placedAtPosition: step.placedAtPosition ? {
            ...step.placedAtPosition,
            fCoord: step.placedAtPosition.fCoord === null ? Infinity : step.placedAtPosition.fCoord,
            length: step.placedAtPosition.length === null ? Infinity : step.placedAtPosition.length,
            groupRestrictedBy: step.placedAtPosition.groupRestrictedBy ?? null
          } : undefined,
          createdPositions: [...step.createdPositions.map(position => ({
            ...position,
            fCoord: position.fCoord === null ? Infinity : position.fCoord,
            length: position.length === null ? Infinity : position.length
          }))]
        }))
      ]
    }
    return {
      entities: entities,
      ids: [exemplarySolution.solution.id],
      selectedSolutionId: exemplarySolution.solution.id
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

  on(updateSolution, (state, { solution }) => {
    const update = {
      id: solution.id,
      changes: {
        description: solution.description,
        calculationSource: solution.calculationSource
      }
    } as Update<ISolution>;
    return adapter.updateOne(update, state);
  })
);

function solutionCalculationSourcesMatch(solution1: ISolution | null | undefined, solution2: ISolution | null | undefined) {
  if (!!solution1?.calculationSource?.staticAlgorithm || !!solution2?.calculationSource?.staticAlgorithm) {
    return false;
  }
  return solution1!.calculationSource!.staticAlgorithm === solution2!.calculationSource!.staticAlgorithm;
}
