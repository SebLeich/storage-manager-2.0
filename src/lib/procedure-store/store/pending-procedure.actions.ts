import { createAction, props } from '@ngrx/store';
import { IProcedure } from 'src/lib/procedure-store/interfaces/procedure.interface';

export const procedureActions = {
  AnnounceProcedure: '[Procedure] Announce Procedure',
  AnnounceProcedures: '[Procedure] Announce Procedures',
  ClearFinishedProcedures: '[Procedure] Clear Finished Procedures',
  UpdateGlobalProcedureProgress: '[Procedure] Update Global Procedure',
  UpdateProcedure: '[Procedure] Update Procedure',
  UpsertProcedure: '[Procedure] Upsert Procedure',
}

export const announceProcedure = createAction(
  procedureActions.AnnounceProcedure,
  props<{ procedure?: Partial<IProcedure> }>()
);

export const announceProcedures = createAction(
  procedureActions.AnnounceProcedures,
  props<{ procedures: Partial<IProcedure>[] }>()
);

export const clearFinishedProcedures = createAction(
  procedureActions.ClearFinishedProcedures
);

export const updateGlobalProcedureProgress = createAction(
  procedureActions.UpdateGlobalProcedureProgress
);

export const updateProcedure = createAction(
  procedureActions.UpdateProcedure,
  props<{ procedure: Partial<IProcedure> }>()
);

export const upsertProcedure = createAction(
  procedureActions.UpsertProcedure,
  props<{ procedure?: Partial<IProcedure> }>()
);
