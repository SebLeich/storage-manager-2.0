import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { IBpmnJSModel } from '../../interfaces/i-bpmn-js-model.interface';
import * as fromIBpmnJSModel from '../reducers/bpmn-js-model.reducer';

export const selectIBpmnJSModelState = createFeatureSelector<fromIBpmnJSModel.State>(
    fromIBpmnJSModel.featureKey,
);

export const selectCurrentIBpmnJSModelGuid = createSelector(
    selectIBpmnJSModelState,
    (state: fromIBpmnJSModel.State) => {
        return state?.currentBpmnJSModelGuid;
    }
);

export const selectCurrentIBpmnJSModel = createSelector(
    selectIBpmnJSModelState,
    (state: fromIBpmnJSModel.State) => {
        if (!state || !state.currentBpmnJSModelGuid || !state.entities) {
            return null;
        }

        return state?.entities[state.currentBpmnJSModelGuid] ?? null;
    }
);

export const selectIBpmnJSModel = (arg: string | (() => string)) => createSelector(
    selectIBpmnJSModelState,
    (state: fromIBpmnJSModel.State) => {
        if (!state || !state.entities || !arg || arg === 'dynamic') {
            return null;
        }

        let code = typeof arg === 'function' ? arg() : arg;
        if (!code || code === 'dynamic') {
            return null;
        }

        return Object.values(state.entities).find(x => x?.guid === code);
    }
);

export const selectIBpmnJSModels = (codes?: string[]) => createSelector(
    selectIBpmnJSModelState,
    (state: fromIBpmnJSModel.State) => {
        if (!state || !state.entities) return [];
        let params = Object.values(state.entities);
        if (Array.isArray(codes)) params = params.filter(x => codes.findIndex(y => x?.guid === y) > -1);
        return params as IBpmnJSModel[];
    }
);

export const selectIBpmnJSModelsByName = (names: string[] | null | undefined) => createSelector(
    selectIBpmnJSModelState,
    (state: fromIBpmnJSModel.State) => {
        if (!names || !state || !state.entities) return [];
        return Object.values(state.entities).filter(x => x && typeof x.name === 'string' && names.indexOf(x.name) > -1) as IBpmnJSModel[];
    }
);

export const selectRecentlyUsedIBpmnJSModel = () => createSelector(
    selectIBpmnJSModelState,
    (state: fromIBpmnJSModel.State) => {
        return Object.values(state.entities).sort((a, b) => (a?.lastModified ?? '') < (b?.lastModified ?? '') ? 1 : -1)[0];
    }
);
