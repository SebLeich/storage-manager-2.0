import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromInjectionContext from '../reducers/injection-context.reducer';

export const injectProviderState = createFeatureSelector<fromInjectionContext.State>(
    fromInjectionContext.featureKey
);

export const injectProviders = createSelector(injectProviderState, (state: fromInjectionContext.State) => {
    return state;
});

export const injectInterfaces = () => createSelector(injectProviderState, (state: fromInjectionContext.State) => {
    return state.interfaces;
});

export const injectValues = () => createSelector(injectProviderState, (state: fromInjectionContext.State) => {
    return state.values;
});

export const injectProvider = (arg: string) => createSelector(injectProviderState, (state: fromInjectionContext.State) => {
    if (!state || typeof arg !== 'string') {
        return undefined;
    }
    return { provide: arg, interface: state.interfaces[arg], value: state.values[arg] };
});
