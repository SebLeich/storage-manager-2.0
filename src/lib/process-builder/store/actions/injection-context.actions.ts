import { createAction } from "@ngrx/store";

export const upsertProvider = createAction(
  '[IParam] Upsert Provider',
  (provide: string, valueObject: any, interfaceObject: any) => ({ provide, valueObject, interfaceObject })
);

export const removeProvider = createAction(
  '[IParam] Remove Provider',
  (provide: string) => ({ provide })
);