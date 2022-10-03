import { createAction } from '@ngrx/store';
import { IBpmnJSModel } from '../../interfaces/i-bpmn-js-model.interface';

export const addIBpmnJSModel = createAction(
  '[IBpmnJSModel] Add IBpmnJSModel',
  (model: IBpmnJSModel) => ({ model })
);

export const addIBpmnJSModels = createAction(
  '[IBpmnJSModel] Add IBpmnJSModels',
  (models: IBpmnJSModel[]) => ({ models })
);

export const createIBpmnJsModel = createAction(
  '[IBpmnJSModel] Create IBpmnJSModel',
  (properties?: Partial<IBpmnJSModel>, preventAutoSet: boolean = false) => ({ properties, preventAutoSet })
);

export const setCurrentIBpmnJSModel = createAction(
  '[IBpmnJSModel] Set Current IBpmnJSModel',
  (arg: IBpmnJSModel | string) => ({ arg })
);

export const updateCurrentIBpmnJSModel = createAction(
  '[IBpmnJSModel] Update Current IBpmnJSModel',
  (properties: Partial<IBpmnJSModel>) => ({ properties })
);

export const updateIBpmnJSModel = createAction(
  '[IBpmnJSModel] Update IBpmnJSModel',
  (model: IBpmnJSModel) => ({ model })
);

export const upsertIBpmnJSModel = createAction(
  '[IBpmnJSModel] Upsert IBpmnJSModel',
  (model: IBpmnJSModel) => ({ model })
);

export const upsertIBpmnJSModels = createAction(
  '[IFunction] Upsert IParams',
  (models: IBpmnJSModel[]) => ({ models })
);

export const removeIBpmnJSModel = createAction(
  '[IParam] Remove IBpmnJSModel',
  (model: IBpmnJSModel | string) => ({ model })
);
