import { createReducer, on } from '@ngrx/store';
import { InjectorInterfacesProvider, InjectorProvider } from '../../globals/injector-interfaces-provider';
import { upsertProvider, removeProvider } from '../actions/injection-context.actions';


export const featureKey = 'injectionContext';

export interface State {
    interfaces: {
        [key: string]: object
    },
    values: {
        [key: string]: object
    }
}

export const initialState: State = {
    interfaces: {
        httpExtensions: InjectorInterfacesProvider.httpExtensions(),
        rxjs: InjectorInterfacesProvider.rxjs(),
    },
    values: {
        httpExtensions: InjectorProvider.httpExtensions(),
        rxjs: InjectorProvider.rxjs(),
    }
};

export const reducer = createReducer(
    initialState,
    on(removeProvider, (state: State, { provide }) => {
        let updatedState = { ...state };
        delete updatedState.values[provide];
        delete updatedState.interfaces[provide];
        return updatedState;
    }),
    on(upsertProvider, (state: State, { provide, valueObject, interfaceObject }) => {
        let updatedState: State = {
            interfaces: { ...state.interfaces },
            values: { ...state.values }
        };
        updatedState.values[provide] = valueObject;
        updatedState.interfaces[provide] = interfaceObject;
        return updatedState;
    }),
);
