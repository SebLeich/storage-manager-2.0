import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as moment from 'moment';
import { v4 as generateGuid } from 'uuid';
import { IProcedure } from 'src/app/interfaces/i-procedure.interface';
import { announceProcedure, announceProcedures, clearFinishedProcedures, updateGlobalProcedureProgress, updateProcedure, upsertProcedure } from '../actions/i-pending-procedure.actions';

export const pendingProcedureFeatureKey = 'pendingProcedures';

export interface State extends EntityState<IProcedure> {
  hasPendingTasks: boolean;
  globalProgress: number | null;
  ids: string[];
}

export const adapter = createEntityAdapter<IProcedure>(
  {
    selectId: (procedure) => procedure.guid,
    sortComparer: (procedureA, procedureB) => procedureA.guid > procedureB.guid ? 1 : -1,
  }
);

export const initialState: State = adapter.getInitialState({
  hasPendingTasks: false,
  globalProgress: null,
  entities: {},
  ids: [],
});


export const pendingProcedureReducer = createReducer(
  initialState,

  on(announceProcedure, (state, { procedure }) => {
    if (!procedure) {
      procedure = {} as IProcedure;
    }
    const updatedState = adapter.addOne({
      ...procedure,
      guid: procedure?.guid ?? generateGuid(),
      startedUnix: moment().unix(),
      finishedUnix: procedure.finishedUnix ?? null,
      progress: procedure.progress ?? false
    }, { ...state, hasPendingTasks: true, });
    return updatedState;
  }),

  on(announceProcedures, (state, { procedures }) => {
    const updatedProcedures = procedures.map(procedure => {
      if (!procedure) {
        procedure = {} as IProcedure;
      }
      return {
        ...procedure,
        guid: procedure.guid ?? generateGuid(),
        startedUnix: moment().unix(),
        finishedUnix: procedure.finishedUnix ?? null,
        progress: procedure.progress ?? false
      };
    });
    return adapter.addMany(updatedProcedures, state);
  }),

  on(clearFinishedProcedures, (state) => {
    const finishedProcedures = Object.values(state.entities).filter(procedure => typeof procedure!.progress === 'number' && procedure!.progress === 100 || procedure!.progress === true);
    const updatedState = adapter.removeMany(finishedProcedures.map(procedure => procedure!.guid), state);
    return updatedState;
  }),

  on(updateProcedure, (state, { procedure }) => {
    const updatedState = adapter.updateOne({
      id: procedure.guid!,
      changes: procedure
    }, state);
    return updatedState;
  }),

  on(updateGlobalProcedureProgress, (state) => {
    const hasPendingTasks = Object.values(state.entities)
      .some(procedure => (procedure!.progress === false) || (typeof procedure!.progress === 'number' && procedure!.progress < 100));

    const determinateProcedures = Object.values(state.entities).filter(procedure => typeof procedure?.progress === 'number' && procedure!.progress < 100);
    const calculatedProgress = determinateProcedures.length === 0 ? null : determinateProcedures.map(procedure => procedure!.progress as number).reduce((prev, curr) => prev + curr, 0) / determinateProcedures.length;
    return { ...state, globalProgress: calculatedProgress, hasPendingTasks: hasPendingTasks };
  }),

  on(upsertProcedure, (state, { procedure }) => {
    if (!procedure) {
      procedure = { guid: generateGuid() } as IProcedure;
    }
    const updatedState = adapter.upsertOne({
      ...procedure,
      guid: procedure?.guid ?? generateGuid(),
      startedUnix: moment().unix(),
      finishedUnix: procedure.finishedUnix ?? null,
      progress: procedure.progress ?? false
    }, state);
    return updatedState;
  }),
);
