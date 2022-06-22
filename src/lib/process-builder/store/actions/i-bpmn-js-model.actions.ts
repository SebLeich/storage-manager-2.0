import { createAction } from '@ngrx/store';
import { IBpmnJSModel } from '../../globals/i-bpmn-js-model';

export const addIBpmnJSModel = createAction(
  '[IBpmnJSModel] Add IBpmnJSModel',
  (model: IBpmnJSModel) => ({ model })
);

export const addIBpmnJSModels = createAction(
  '[IBpmnJSModel] Add IBpmnJSModels',
  (models: IBpmnJSModel[]) => ({ models })
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
  (model: IBpmnJSModel|string) => ({ model })
);
