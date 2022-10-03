import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { addIBpmnJSModel, addIBpmnJSModels, createIBpmnJsModel, removeIBpmnJSModel, setCurrentIBpmnJSModel, updateCurrentIBpmnJSModel, updateIBpmnJSModel, upsertIBpmnJSModel, upsertIBpmnJSModels } from '../actions/i-bpmn-js-model.actions';
import { v4 as generateGuid } from 'uuid';
import { IBpmnJSModel } from '../../interfaces/i-bpmn-js-model.interface';

import defaultBpmnXmlConstant from '../../globals/default-bpmn-xml.constant';

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
  currentBpmnJSModelGuid: string | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  currentBpmnJSModelGuid: null
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

  on(createIBpmnJsModel, (state: State, { properties, preventAutoSet }) => {
    let bpmnJsModel = {
      guid: generateGuid(),
      created: moment().format('yyyy-MM-ddTHH:mm:ss'),
      description: null,
      name: 'unnamed BpmnJs model',
      xml: defaultBpmnXmlConstant,
      lastModified: moment().format('yyyy-MM-ddTHH:mm:ss')
    } as IBpmnJSModel;

    for (let keyValue in properties) {
      const key: keyof IBpmnJSModel = keyValue as keyof IBpmnJSModel;
      bpmnJsModel[key] = properties[key] as any;
    }

    return adapter.addOne(bpmnJsModel, { ...state, currentBpmnJSModelGuid: preventAutoSet ? state.currentBpmnJSModelGuid : bpmnJsModel.guid });
  }),

  on(setCurrentIBpmnJSModel, (state: State, { arg }) => {
    return { ...state, currentBpmnJSModelGuid: typeof arg === 'string'? arg: arg.guid };
  }),

  on(updateCurrentIBpmnJSModel, (state: State, { properties }) => {
    if (state.currentBpmnJSModelGuid) {
      return adapter.updateOne({
        id: state.currentBpmnJSModelGuid,
        changes: { ...properties, lastModified: moment().format() }
      }, state);
    }
    return state;
  }),

  on(updateIBpmnJSModel, (state: State, { model }) => {
    const update: Update<IBpmnJSModel> = {
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
