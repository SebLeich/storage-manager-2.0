import * as fromICalculationContextState from './store/reducers/i-calculation-context.reducers';
import { ICalculationContextEffects } from './store/effects/i-calculation-context.effects';

import * as fromIGroupState from './store/reducers/i-group.reducers';
import { IGroupEffects } from './store/effects/i-group.effects';

import * as fromIOrderState from './store/reducers/i-order.reducers';
import { IOrderEffects } from './store/effects/i-order.effects';

import * as fromIProductState from './store/reducers/i-product.reducers';
import { IProductEffects } from './store/effects/i-product.effects';

import * as fromISolutionState from './store/reducers/i-solution.reducers';
import { ISolutionEffects } from './store/effects/i-solution.effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

let rootStoreFeatures: any = {};
rootStoreFeatures[fromICalculationContextState.calculationContextFeatureKey] = fromICalculationContextState.calculationContextReducer;
rootStoreFeatures[fromIGroupState.groupFeatureKey] = fromIGroupState.groupReducer;
rootStoreFeatures[fromIOrderState.orderFeatureKey] = fromIOrderState.orderReducer;
rootStoreFeatures[fromIProductState.productFeatureKey] = fromIProductState.productReducer;
rootStoreFeatures[fromISolutionState.solutionFeatureKey] = fromISolutionState.solutionReducer;

export default [
    NoopAnimationsModule,
    StoreModule.forRoot(rootStoreFeatures, {

    }),
    EffectsModule.forRoot([ICalculationContextEffects, IGroupEffects, IOrderEffects, IProductEffects, ISolutionEffects]),
];