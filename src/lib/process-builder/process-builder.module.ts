// @ts-ignore
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

// @ts-ignore
import customBPMNJSModule from './extensions/bpmn-js';

// @ts-ignore
import gridModule from "./extensions/bpmn-js/grid";

// @ts-ignore
import CliModule from 'bpmn-js-cli';

// @ts-ignore
import * as tooltips from "diagram-js/lib/features/tooltips";

import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcessBuilderComponent } from './components/process-builder/process-builder.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { IBpmnJSModelEffects, bpmnJsModelState, IInterfaceEffects, interfaceState, IFunctionEffects, functionState, IParamEffects, paramState, loadIInterfaces, loadIParams, loadIFunctions } from '@process-builder/store';
import * as fromInjectionContext from './store/reducers/injection-context.reducer';
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
import { ReturnValueStatusPipe } from './pipes/return-value-status.pipe';
import { EmbeddedParamEditorComponent } from './components/embedded/embedded-param-editor/embedded-param-editor.component';
import { localStorageAdapter, provideLocalStorageSettings } from './adapters/local-storage-adapter';
import { ValidationErrorPipe } from './pipes/validation-error.pipe';
import { ParamPreviewComponent } from './components/previews/param-preview/param-preview.component';
import { ValidationWarningPipe } from './pipes/validation-warning.pipe';
import { EmbeddedInputOutputMappingComponent } from './components/embedded/embedded-input-output-mapping/embedded-input-output-mapping.component';
import { EmbeddedInputOutputMappingTableRowComponent } from './components/helpers/embedded-input-output-mapping-table-row/embedded-input-output-mapping-table-row.component';
import { InterfacePipe } from './pipes/interface.pipe';
import { ParamMemberPreviewComponent } from './components/helpers/param-member-preview/param-member-preview.component';
import { ParamMemberPathPreviewComponent } from './components/helpers/param-member-path-preview/param-member-path-preview.component';
import { BpmnJsService } from './services/bpmn-js.service';
import { ProcessBuilderService } from './services/process-builder.service';
import { upsertProvider } from './store/actions/injection-context.actions';
import { InjectorInterfacesProvider } from './globals/injector-interfaces-provider';
import { ConfirmationModule } from '../confirmation/confirmation.module';
import { ConfirmationService } from '../confirmation/services/confirmation.service';
import { PipelineStoreModule } from '../pipeline-store/pipeline-store.module';
import { UserInputComponent } from './components/helpers/user-input/user-input.component';
import { MatSelectModule } from '@angular/material/select';
import { InputParamPipe } from './pipes/input-param.pipe';
import { ProcedureStoreModule } from '../procedure-store/procedure-store.module';
import { CodeEditorModule } from '../code-editor/code-editor.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import sebleichProcessBuilderExtension from './globals/sebleich-process-builder-extension';
import { BPMN_JS } from '@process-builder/injection';
import { FunctionOutputPreviewComponent } from './components/embedded/embedded-function-implementation/components/function-output-preview/function-output-preview.component';


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
    ParamPreviewComponent,
    ValidationWarningPipe,
    EmbeddedInputOutputMappingComponent,
    EmbeddedInputOutputMappingTableRowComponent,
    InterfacePipe,
    ParamMemberPreviewComponent,
    ParamMemberPathPreviewComponent,
    UserInputComponent,
    InputParamPipe,
    FunctionOutputPreviewComponent
  ],
  imports: [
    CommonModule,
    ConfirmationModule,
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
    MatSelectModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    PipelineStoreModule,

    StoreModule.forFeature(paramState.featureKey, paramState.reducer),
    EffectsModule.forFeature([IParamEffects]),

    StoreModule.forFeature(functionState.featureKey, functionState.reducer),
    EffectsModule.forFeature([IFunctionEffects]),

    StoreModule.forFeature(bpmnJsModelState.featureKey, bpmnJsModelState.reducer),
    EffectsModule.forFeature([IBpmnJSModelEffects]),

    StoreModule.forFeature(interfaceState.featureKey, interfaceState.reducer),
    EffectsModule.forFeature([IInterfaceEffects]),

    StoreModule.forFeature(fromInjectionContext.featureKey, fromInjectionContext.reducer),

    ProcedureStoreModule,
    CodeEditorModule
  ],
  exports: [
    ProcessBuilderComponent,
    ProcedureStoreModule,
    ValidationErrorPipe,
    ValidationWarningPipe
  ],
  providers: [
    BpmnJsService,
    ConfirmationService,
    ParamPipe,
    ProcessBuilderService,
    {
      provide: BPMN_JS, useFactory: () => (new BpmnJS({
        additionalModules: [
          customBPMNJSModule,
          gridModule,
          CliModule,
          tooltips
        ],
        cli: {
          bindTo: 'cli'
        },
        moddleExtensions: {
          processBuilderExtension: sebleichProcessBuilderExtension
        }
      }))
    }
  ],
})
export class ProcessBuilderModule {

  constructor(store: Store, injector: Injector,) {
    ProcessBuilderModule.initialize(store, injector);
  }

  static initialize(store: Store, injector: Injector): void {
    store.dispatch(loadIFunctions());
    store.dispatch(loadIParams());
    store.dispatch(loadIInterfaces());

    provideLocalStorageSettings(injector);
    localStorageAdapter(injector);

    const httpClient = injector.get(HttpClient);
    store.dispatch(upsertProvider('httpClient', { ...httpClient }, InjectorInterfacesProvider.httpClient()));
  }

}
