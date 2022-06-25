import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessBuilderComponent } from './components/process-builder/process-builder.component';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromIParamState from './store/reducers/i-param.reducer';
import { IParamEffects } from './store/effects/i-param.effects';

import * as fromIFunctionState from './store/reducers/i-function.reducer';
import { IFunctionEffects } from './store/effects/i-function.effects';

import * as fromIBpmnJSModelState from './store/reducers/i-bpmn-js-model.reducer';
import { IBpmnJSModelEffects } from './store/effects/i-bpmn-js-model.effects';


import * as fromIInterfaceState from './store/reducers/i-interface.reducer';
import { IInterfaceEffects } from './store/effects/i-interface.effects';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FunctionPreviewComponent } from './components/previews/function-preview/function-preview.component';
import { ParamPipe } from './pipes/param.pipe';
import { ParamEditorComponent } from './components/dialog/param-editor/param-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskCreationComponent } from './components/dialog/task-creation/task-creation.component';
import { TaskCreationStepPipe } from './pipes/task-creation-step.pipe';
import { EmbeddedFunctionSelectionComponent } from './components/embedded/embedded-function-selection/embedded-function-selection.component';
import { EmbeddedConfigureErrorGatewayEntranceConnectionComponent } from './components/embedded/embedded-configure-error-gateway-entrance-connection/embedded-configure-error-gateway-entrance-connection.component';
import { DynamicInputParamsPipe } from './pipes/dynamic-input-params.pipe';
import { EmbeddedFunctionImplementationComponent } from './components/embedded/embedded-function-implementation/embedded-function-implementation.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ReturnValueStatusPipe } from './pipes/return-value-status.pipe';
import { loadIFunctions } from './store/actions/i-function.actions';
import { EmbeddedParamEditorComponent } from './components/embedded/embedded-param-editor/embedded-param-editor.component';
import { localStorageAdapter, provideLocalStorageSettings } from './adapters/local-storage-adapter';
import { loadIParams } from './store/actions/i-param.actions';
import { ValidationErrorPipe } from './pipes/validation-error.pipe';
import { EmbeddedFunctionInputSelectionComponent } from './components/embedded/embedded-function-input-selection/embedded-function-input-selection.component';
import { ParamPreviewComponent } from './components/previews/param-preview/param-preview.component';
import { ProcessBuilderComponentService } from './components/process-builder/process-builder-component.service';
import { ValidationWarningPipe } from './pipes/validation-warning.pipe';
import { EmbeddedInputOutputMappingComponent } from './components/embedded/embedded-input-output-mapping/embedded-input-output-mapping.component';
import { EmbeddedInputOutputMappingTableRowComponent } from './components/helpers/embedded-input-output-mapping-table-row/embedded-input-output-mapping-table-row.component';
import { loadIInterfaces } from './store/actions/i-interface.actions';


@NgModule({
  declarations: [
    ProcessBuilderComponent,
    FunctionPreviewComponent,
    ParamPipe,
    ParamEditorComponent,
    TaskCreationComponent,
    TaskCreationStepPipe,
    EmbeddedFunctionSelectionComponent,
    EmbeddedConfigureErrorGatewayEntranceConnectionComponent,
    DynamicInputParamsPipe,
    EmbeddedFunctionImplementationComponent,
    ReturnValueStatusPipe,
    EmbeddedParamEditorComponent,
    ValidationErrorPipe,
    EmbeddedFunctionInputSelectionComponent,
    ParamPreviewComponent,
    ValidationWarningPipe,
    EmbeddedInputOutputMappingComponent,
    EmbeddedInputOutputMappingTableRowComponent
  ],
  imports: [
    CodemirrorModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,

    StoreModule.forFeature(fromIParamState.featureKey, fromIParamState.reducer),
    EffectsModule.forFeature([IParamEffects]),

    StoreModule.forFeature(fromIFunctionState.featureKey, fromIFunctionState.reducer),
    EffectsModule.forFeature([IFunctionEffects]),

    StoreModule.forFeature(fromIBpmnJSModelState.featureKey, fromIBpmnJSModelState.reducer),
    EffectsModule.forFeature([IBpmnJSModelEffects]),

    StoreModule.forFeature(fromIInterfaceState.featureKey, fromIInterfaceState.reducer),
    EffectsModule.forFeature([IInterfaceEffects]),

  ],
  exports: [
    ProcessBuilderComponent,
    ValidationErrorPipe,
    ValidationWarningPipe
  ],
  providers: [
    ParamPipe,
    ProcessBuilderComponentService,
    { provide: fromIParamState.PARAM_STORE_TOKEN, useExisting: Store },
    { provide: fromIFunctionState.FUNCTION_STORE_TOKEN, useExisting: Store },
    { provide: fromIBpmnJSModelState.BPMN_JS_MODEL_STORE_TOKEN, useExisting: Store },
    { provide: fromIInterfaceState.IINTERFACE_STORE_TOKEN, useExisting: Store }
  ]
})
export class ProcessBuilderModule {

  constructor(
    injector: Injector,
    private _iFunctionStore: Store<fromIFunctionState.State>,
    private _iParamStore: Store<fromIParamState.State>,
    private _iBpmnJSModelStore: Store<fromIBpmnJSModelState.State>,
    private _iInterfaceStore: Store<fromIInterfaceState.State>
  ) {
    this._iFunctionStore.dispatch(loadIFunctions());
    this._iParamStore.dispatch(loadIParams());
    this._iInterfaceStore.dispatch(loadIInterfaces());
    provideLocalStorageSettings(injector);
    localStorageAdapter(injector);
  }

}
