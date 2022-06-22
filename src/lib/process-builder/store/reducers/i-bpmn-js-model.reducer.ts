import { InjectionToken } from '@angular/core';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on, Store } from '@ngrx/store';
import { IBpmnJSModel } from '../../globals/i-bpmn-js-model';
import { addIBpmnJSModel, addIBpmnJSModels, removeIBpmnJSModel, updateIBpmnJSModel, upsertIBpmnJSModel, upsertIBpmnJSModels } from '../actions/i-bpmn-js-model.actions';
import * as moment from 'moment';


export const featureKey = 'BpmnJSModel';

function sortByIdentifier(a: IBpmnJSModel, b: IBpmnJSModel) {
  return a.guid > b.guid ? 1 : -1;
}

export const adapter: EntityAdapter<IBpmnJSModel> = createEntityAdapter<IBpmnJSModel>({
  selectId: (arg: IBpmnJSModel) => arg.guid,
  sortComparer: sortByIdentifier
});

export interface State extends EntityState<IBpmnJSModel> {
  ids: string[];
}

export const initialState: State = {
  ids: [],
  entities: {}
};

export const reducer = createReducer(

  initialState,

  on(addIBpmnJSModel, (state: State, { model }) => {
    return adapter.addOne({
      'guid': model.guid,
      'created': model.created ?? moment().format('yyyy-MM-ddTHH:mm:ss'),
      'description': model.description,
      'name': model.name,
      'xml': model.xml,
      'lastModified': model.lastModified
    }, state);
  }),

  on(addIBpmnJSModels, (state: State, { models }) => {
    let output: IBpmnJSModel[] = [];
    for (let model of models) {
      output.push({
        'guid': model.guid,
        'created': model.created ?? moment().format('yyyy-MM-ddTHH:mm:ss'),
        'description': model.description,
        'name': model.name,
        'xml': model.xml,
        'lastModified': model.lastModified
      });
    }
    return adapter.addMany(output, state);
  }),

  on(updateIBpmnJSModel, (state: State, { model }) => {
    let update: Update<IBpmnJSModel> = {
      'id': model.guid,
      'changes': {
        'description': model.description,
        'name': model.name,
        'xml': model.xml
      }
    }
    return adapter.updateOne(update, state);
  }),

  on(upsertIBpmnJSModel, (state: State, { model }) => {
    return adapter.upsertOne(model, state);
  }),

  on(upsertIBpmnJSModels, (state: State, { models }) => {
    return adapter.upsertMany(models, state);
  }),

  on(removeIBpmnJSModel, (state: State, { model }) => {
    let key = typeof model === 'string' ? model : model.guid;
    return adapter.removeOne(key, state);
  }),

);

export const BPMN_JS_MODEL_STORE_TOKEN = new InjectionToken<Store<State>>("BPMN_JS_MODEL_STORE");
