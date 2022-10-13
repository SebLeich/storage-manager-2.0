import { createAction, props } from '@ngrx/store';
import { IProcedure } from 'src/app/interfaces/i-pending-procedure.interface';

export const procedureActions = {
  AnnounceProcedure: '[Procedure] Announce Procedure',
  UpdateGlobalProcedureProgress: '[Procedure] Update Global Procedure',
  UpdateProcedure: '[Procedure] Update Procedure',
}

export const announceProcedure = createAction(
  procedureActions.AnnounceProcedure,
  props<{ procedure: IProcedure }>()
);

export const updateGlobalProcedureProgress = createAction(
  procedureActions.UpdateGlobalProcedureProgress
);

export const updateProcedure = createAction(
  procedureActions.UpdateProcedure,
  props<{ procedure: Partial<IProcedure> }>()
);
