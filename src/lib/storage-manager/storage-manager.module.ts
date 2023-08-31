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
import { SelectGroupComponent } from './components/select/select-group/select-group.component';
import { SelectProductComponent } from './components/select/select-product/select-product.component';
import { SelectUnitComponent } from './components/select/select-unit/select-unit.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SelectGroupComponent,
    SelectProductComponent,
    SelectUnitComponent,
  ],
  imports: [
    CommonModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,

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
    ProcedureStoreModule,
    SelectGroupComponent,
    SelectProductComponent,
    SelectUnitComponent,
  ]
})
export class StorageManagerModule { }
