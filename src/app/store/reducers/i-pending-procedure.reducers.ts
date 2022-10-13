import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as moment from 'moment';
import { v4 as generateGuid } from 'uuid';
import { IProcedure } from 'src/app/interfaces/i-pending-procedure.interface';
import { announceProcedure, updateGlobalProcedureProgress, updateProcedure } from '../actions/i-pending-procedure.actions';

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
    const updatedState = adapter.addOne({ ...procedure, guid: procedure.guid ?? generateGuid(), startedUnix: moment().unix() }, { ...state, hasPendingTasks: true, });
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
    const determinateProcedures = Object.values(state.entities).filter(procedure => typeof procedure?.progress === 'number' && procedure!.progress < 100);
    const calculatedProgress = determinateProcedures.length === 0 ? null : determinateProcedures.map(procedure => procedure!.progress as number).reduce((prev, curr) => prev + curr, 0);
    return { ...state, globalProgress: calculatedProgress };
  })
);
