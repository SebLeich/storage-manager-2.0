import * as fromCalculationAttributesState from './store/reducers/i-calculation-attribute.reducers';
import { ICalculationAttributesEffects } from './store/effects/i-calculation-attribute.effects';

import * as fromGroupState from './store/reducers/i-group.reducers';
import { IGroupEffects } from './store/effects/i-group.effects';

import * as fromOrderState from './store/reducers/i-order.reducers';
import { IOrderEffects } from './store/effects/i-order.effects';

import * as fromProductState from './store/reducers/i-product.reducers';
import { IProductEffects } from './store/effects/i-product.effects';

import * as fromProcedureState from './store/reducers/i-pending-procedure.reducers';
import { IPendingProcedureEffects } from './store/effects/i-pending-procedure.effects';

import * as fromSolutionState from './store/reducers/i-solution.reducers';
import { ISolutionEffects } from './store/effects/i-solution.effects';

import * as fromSolutionPreviewState from './store/reducers/i-solution-preview.reducers';
import { ISolutionPreviewEffects } from './store/effects/i-solution-preview.effects';

import * as fromParamState from 'src/lib/process-builder/store/reducers/param.reducer';
import { IParamEffects } from 'src/lib/process-builder/store/effects/param.effects';

import * as fromFunctionState from 'src/lib/process-builder/store/reducers/function.reducer';
import { IFunctionEffects } from 'src/lib/process-builder/store/effects/i-function.effects';

import * as fromBpmnJSModelState from 'src/lib/process-builder/store/reducers/bpmn-js-model.reducer';
import { IBpmnJSModelEffects } from 'src/lib/process-builder/store/effects/i-bpmn-js-model.effects';

import * as fromInterfaceState from 'src/lib/process-builder/store/reducers/interface.reducer';
import { IInterfaceEffects } from 'src/lib/process-builder/store/effects/interface.effects';

import * as fromInjectionContext from 'src/lib/process-builder/store/reducers/injection-context.reducer';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

let rootStoreFeatures: any = {};
rootStoreFeatures[fromCalculationAttributesState.calculationAttributesFeatureKey] = fromCalculationAttributesState.calculationAttributesReducer;
rootStoreFeatures[fromGroupState.groupFeatureKey] = fromGroupState.groupReducer;
rootStoreFeatures[fromOrderState.orderFeatureKey] = fromOrderState.orderReducer;
rootStoreFeatures[fromProcedureState.pendingProcedureFeatureKey] = fromProcedureState.pendingProcedureReducer;
rootStoreFeatures[fromProductState.productFeatureKey] = fromProductState.productReducer;
rootStoreFeatures[fromSolutionState.solutionFeatureKey] = fromSolutionState.solutionReducer;
rootStoreFeatures[fromSolutionPreviewState.solutionPreviewFeatureKey] = fromSolutionPreviewState.reducer;

rootStoreFeatures[fromParamState.featureKey] = fromParamState.reducer;
rootStoreFeatures[fromFunctionState.featureKey] = fromFunctionState.reducer;
rootStoreFeatures[fromBpmnJSModelState.featureKey] = fromBpmnJSModelState.reducer;
rootStoreFeatures[fromInterfaceState.featureKey] = fromInterfaceState.reducer;
rootStoreFeatures[fromInterfaceState.featureKey] = fromInterfaceState.reducer;
rootStoreFeatures[fromInjectionContext.featureKey] = fromInjectionContext.reducer;

export default [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootStoreFeatures, { }),
    EffectsModule.forRoot([
        ICalculationAttributesEffects,
        IGroupEffects,
        IOrderEffects,
        IPendingProcedureEffects,
        IProductEffects,
        ISolutionEffects,
        ISolutionPreviewEffects,

        IParamEffects,
        IFunctionEffects,
        IBpmnJSModelEffects,
        IInterfaceEffects
    ]),
];