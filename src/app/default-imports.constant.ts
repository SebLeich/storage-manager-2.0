import * as fromICalculationAttributesState from './store/reducers/i-calculation-attribute.reducers';
import { ICalculationAttributesEffects } from './store/effects/i-calculation-attribute.effects';

import * as fromIGroupState from './store/reducers/i-group.reducers';
import { IGroupEffects } from './store/effects/i-group.effects';

import * as fromIOrderState from './store/reducers/i-order.reducers';
import { IOrderEffects } from './store/effects/i-order.effects';

import * as fromIProductState from './store/reducers/i-product.reducers';
import { IProductEffects } from './store/effects/i-product.effects';

import * as fromISolutionState from './store/reducers/i-solution.reducers';
import { ISolutionEffects } from './store/effects/i-solution.effects';

import * as fromIParamState from 'src/lib/process-builder/store/reducers/i-param.reducer';
import { IParamEffects } from 'src/lib/process-builder/store/effects/i-param.effects';

import * as fromIFunctionState from 'src/lib/process-builder/store/reducers/i-function.reducer';
import { IFunctionEffects } from 'src/lib/process-builder/store/effects/i-function.effects';

import * as fromIBpmnJSModelState from 'src/lib/process-builder/store/reducers/i-bpmn-js-model.reducer';
import { IBpmnJSModelEffects } from 'src/lib/process-builder/store/effects/i-bpmn-js-model.effects';

import * as fromIInterfaceState from 'src/lib/process-builder/store/reducers/i-interface.reducer';
import { IInterfaceEffects } from 'src/lib/process-builder/store/effects/i-interface.effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

let rootStoreFeatures: any = {};
rootStoreFeatures[fromICalculationAttributesState.calculationAttributesFeatureKey] = fromICalculationAttributesState.calculationAttributesReducer;
rootStoreFeatures[fromIGroupState.groupFeatureKey] = fromIGroupState.groupReducer;
rootStoreFeatures[fromIOrderState.orderFeatureKey] = fromIOrderState.orderReducer;
rootStoreFeatures[fromIProductState.productFeatureKey] = fromIProductState.productReducer;
rootStoreFeatures[fromISolutionState.solutionFeatureKey] = fromISolutionState.solutionReducer;

rootStoreFeatures[fromIParamState.featureKey] = fromIParamState.reducer;
rootStoreFeatures[fromIFunctionState.featureKey] = fromIFunctionState.reducer;
rootStoreFeatures[fromIBpmnJSModelState.featureKey] = fromIBpmnJSModelState.featureKey;
rootStoreFeatures[fromIInterfaceState.featureKey] = fromIInterfaceState.featureKey;

export default [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootStoreFeatures, { }),
    EffectsModule.forRoot([
        ICalculationAttributesEffects,
        IGroupEffects,
        IOrderEffects,
        IProductEffects,
        ISolutionEffects,

        IParamEffects,
        IFunctionEffects,
        IBpmnJSModelEffects,
        IInterfaceEffects
    ]),
];