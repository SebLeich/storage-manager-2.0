import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromICalculationAttributesState from './store/reducers/calculation-attribute.reducers';
import { ICalculationAttributesEffects } from './store/effects/i-calculation-attribute.effects';

import * as fromIGroupState from './store/reducers/group.reducers';
import { IGroupEffects } from './store/effects/i-group.effects';

import * as fromIOrderState from './store/reducers/order.reducers';
import { IOrderEffects } from './store/effects/i-order.effects';

import * as fromIPendingProceduresState from './store/reducers/i-pending-procedure.reducers';
import { IPendingProcedureEffects } from './store/effects/i-pending-procedure.effects';

import * as fromIProductState from './store/reducers/product.reducers';
import { IProductEffects } from './store/effects/i-product.effects';

import * as fromISolutionState from './store/reducers/solution.reducers';
import { ISolutionEffects } from './store/effects/i-solution.effects';

import * as fromISolutionPreviewState from './store/reducers/i-solution-preview.reducers';
import { ISolutionPreviewEffects } from './store/effects/i-solution-preview.effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    
    StoreModule.forFeature(fromICalculationAttributesState.calculationAttributesFeatureKey, fromICalculationAttributesState.reducer),
    StoreModule.forFeature(fromIGroupState.groupFeatureKey, fromIGroupState.reducer),
    StoreModule.forFeature(fromIOrderState.orderFeatureKey, fromIOrderState.reducer),
    StoreModule.forFeature(fromIPendingProceduresState.featureKey, fromIPendingProceduresState.reducer),
    StoreModule.forFeature(fromIProductState.productFeatureKey, fromIProductState.reducer),
    StoreModule.forFeature(fromISolutionState.solutionFeatureKey, fromISolutionState.reducer),
    StoreModule.forFeature(fromISolutionPreviewState.solutionPreviewFeatureKey, fromISolutionPreviewState.reducer),

    EffectsModule.forFeature([ICalculationAttributesEffects, IGroupEffects, IOrderEffects, IPendingProcedureEffects, IProductEffects, ISolutionEffects, ISolutionPreviewEffects]),
  ]
})
export class StorageManagerStoreModule { }
