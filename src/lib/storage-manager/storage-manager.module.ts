import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromICalculationAttributesState from './store/reducers/calculation-attribute.reducers';
import { ICalculationAttributesEffects } from './store/effects/calculation-attribute.effects';

import * as fromIGroupState from './store/reducers/group.reducers';
import { IGroupEffects } from './store/effects/group.effects';

import * as fromIOrderState from './store/reducers/order.reducers';
import { IOrderEffects } from './store/effects/order.effects';

import * as fromIProductState from './store/reducers/product.reducers';
import { IProductEffects } from './store/effects/product.effects';

import * as fromISolutionState from './store/reducers/solution.reducers';
import { ISolutionEffects } from './store/effects/solution.effects';

import * as fromISolutionPreviewState from './store/reducers/solution-preview.reducers';
import { ISolutionPreviewEffects } from './store/effects/solution-preview.effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProcedureStoreModule } from '../procedure-store/procedure-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    StoreModule.forFeature(fromICalculationAttributesState.calculationAttributesFeatureKey, fromICalculationAttributesState.reducer),
    StoreModule.forFeature(fromIGroupState.groupFeatureKey, fromIGroupState.reducer),
    StoreModule.forFeature(fromIOrderState.featureKey, fromIOrderState.reducer),
    StoreModule.forFeature(fromIProductState.featureKey, fromIProductState.reducer),
    StoreModule.forFeature(fromISolutionState.featureKey, fromISolutionState.reducer),
    StoreModule.forFeature(fromISolutionPreviewState.solutionPreviewFeatureKey, fromISolutionPreviewState.reducer),

    EffectsModule.forFeature([ICalculationAttributesEffects, IGroupEffects, IOrderEffects, IProductEffects, ISolutionEffects, ISolutionPreviewEffects]),

    ProcedureStoreModule
  ],
  exports: [
    ProcedureStoreModule
  ]
})
export class StorageManagerModule { }
