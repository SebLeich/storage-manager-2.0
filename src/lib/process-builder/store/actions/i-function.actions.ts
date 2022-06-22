import { createAction } from '@ngrx/store';
import { IFunction } from '../../globals/i-function';

export const loadIFunctions = createAction(
  '[IFunction] Load IFunctions'
);

export const addIFunction = createAction(
  '[IFunction] Add IFunction',
  (func: IFunction) => ({ func })
);

export const addIFunctions = createAction(
  '[IFunction] Add IFunctions',
  (funcs: IFunction[]) => ({ funcs })
);

export const removeIFunction = createAction(
  '[IFunction] Remove IFunction',
  (func: IFunction | number) => ({ func })
);

export const updateIFunction = createAction(
  '[IFunction] Update IFunction',
  (func: IFunction) => ({ func })
);

export const updateIFunctionOutputParam = createAction(
  '[IFunction] Update IFunction Output Param',
  (identifier: number, outputParam: number) => ({ identifier, outputParam })
);

export const upsertIFunctions = createAction(
  '[IFunction] Upsert IFunctions',
  (funcs: IFunction[]) => ({ funcs })
);
