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
import { calculationAttributeState, groupState, orderState, productState, solutionState, solutionPreviewState, ICalculationAttributesEffects, IGroupEffects, IOrderEffects, IPendingProcedureEffects, IProductEffects, ISolutionEffects, ISolutionPreviewEffects } from '@smgr/store';

import * as fromIProcedureState from 'src/app/store/reducers/application.reducer';
import { bpmnJsModelState, functionState, IBpmnJSModelEffects, IFunctionEffects, IInterfaceEffects, injectionContextState, interfaceState, IParamEffects, paramState } from '@process-builder/store';

let rootStoreFeatures: any = {};
rootStoreFeatures[calculationAttributeState.calculationAttributesFeatureKey] = calculationAttributeState.reducer;
rootStoreFeatures[groupState.groupFeatureKey] = groupState.reducer;
rootStoreFeatures[orderState.featureKey] = orderState.reducer;
rootStoreFeatures[productState.featureKey] = productState.reducer;
rootStoreFeatures[solutionState.featureKey] = solutionState.reducer;
rootStoreFeatures[solutionPreviewState.solutionPreviewFeatureKey] = solutionPreviewState.reducer;

rootStoreFeatures[paramState.featureKey] = paramState.reducer;
rootStoreFeatures[functionState.featureKey] = functionState.reducer;
rootStoreFeatures[bpmnJsModelState.featureKey] = bpmnJsModelState.reducer;
rootStoreFeatures[interfaceState.featureKey] = interfaceState.reducer;
rootStoreFeatures[injectionContextState.featureKey] = injectionContextState.reducer;

rootStoreFeatures[fromIProcedureState.pendingProcedureFeatureKey] = productState.reducer;

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