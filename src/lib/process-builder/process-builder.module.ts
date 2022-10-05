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
import { MatMenuModule } from '@angular/material/menu';
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
import { EmbeddedParamEditorComponent } from './components/embedded/embedded-param-editor/embedded-param-editor.component';
import { localStorageAdapter, provideLocalStorageSettings } from './adapters/local-storage-adapter';
import { loadIParams } from './store/actions/i-param.actions';
import { ValidationErrorPipe } from './pipes/validation-error.pipe';
import { EmbeddedFunctionInputSelectionComponent } from './components/embedded/embedded-function-input-selection/embedded-function-input-selection.component';
import { ParamPreviewComponent } from './components/previews/param-preview/param-preview.component';
import { ValidationWarningPipe } from './pipes/validation-warning.pipe';
import { EmbeddedInputOutputMappingComponent } from './components/embedded/embedded-input-output-mapping/embedded-input-output-mapping.component';
import { EmbeddedInputOutputMappingTableRowComponent } from './components/helpers/embedded-input-output-mapping-table-row/embedded-input-output-mapping-table-row.component';
import { loadIInterfaces } from './store/actions/i-interface.actions';
import { InterfacePipe } from './pipes/interface.pipe';
import { ParamMemberPreviewComponent } from './components/helpers/param-member-preview/param-member-preview.component';
import { ParamMemberPathPreviewComponent } from './components/helpers/param-member-path-preview/param-member-path-preview.component';
import { BpmnJsService } from './services/bpmnjs.service';
import { ProcessBuilderService } from './services/process-builder.service';
import { loadIFunctions } from './store/actions/i-function.actions';


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
    EmbeddedInputOutputMappingTableRowComponent,
    InterfacePipe,
    ParamMemberPreviewComponent,
    ParamMemberPathPreviewComponent
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
    MatMenuModule,
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
    BpmnJsService,
    ParamPipe,
    ProcessBuilderService
  ],
})
export class ProcessBuilderModule {

  constructor(store: Store, injector: Injector){
    ProcessBuilderModule.initialize(store, injector);
  }

  static initialize(store: Store, injector: Injector): void {
    store.dispatch(loadIFunctions());
    store.dispatch(loadIParams());
    store.dispatch(loadIInterfaces());

    provideLocalStorageSettings(injector);
    localStorageAdapter(injector);
  }

}
