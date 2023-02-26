import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import PROCESS_BUILDER_CONFIG from 'src/config/process-builder-config';
import PARAMS_CONFIG from 'src/config/params-config';
import FUNCTIONS_CONFIG from 'src/config/function-config';
import INTERFACES_CONFIG from 'src/config/interfaces-config';

import { VisualizerComponent } from './components/main/visualizer/visualizer.component';
import { GoodPreviewComponent } from './components/good-preview/good-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { PrettyLengthPipe } from './pipes/pretty-length.pipe';
import { PrettyVolumePipe } from './pipes/pretty-volume.pipe';
import { EditDataDialogComponent } from './components/dialog/edit-data-dialog/edit-data-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SolutionPreviewComponent } from './components/solution-preview/solution-preview.component';
import { ContainerPreviewComponent } from './components/container-preview/container-preview.component';
import { NgChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GoodsPanelComponent } from './components/goods-panel/goods-panel.component';
import { GroupsPanelComponent } from './components/groups-panel/groups-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortedFormArrayPipe } from './pipes/sorted-form-array.pipe';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SelectUnitComponent } from './components/select/select-unit/select-unit.component';
import { CalculationComponent } from './components/main/calculation/calculation.component';
import { ApiCallConfiguratorDialogComponent } from './components/dialog/api-call-configurator-dialog/api-call-configurator-dialog.component';
import { SelectGroupComponent } from './components/select/select-group/select-group.component';
import { SelectProductComponent } from './components/select/select-product/select-product.component';
import { AutomationModule } from 'src/lib/automation/automation.module';
import { CalculationErrorPipe } from './pipes/calculation-error.pipe';
import { SolutionAnimationComponent } from './components/solution-animation/solution-animation.component';
import { NoSolutionDialogComponent } from './components/dialog/no-solution-dialog/no-solution-dialog.component';
import { SolutionValidationComponent } from './components/solution-validation/solution-validation.component';
import { SolutionValidationErrorPipe } from './pipes/solution-validation-error.pipe';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { PARAMS_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/param.interface';
import { FUNCTIONS_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/function.interface';
import { INTERFACES_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/interface.interface';

import { SharedModule } from 'src/lib/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';

import { LocalDataComponent } from './components/main/local-data/local-data.component';
import { WidgetComponent } from './components/widget/widget.component';
import { OrdersFormComponent } from './components/forms/orders-form/orders-form.component';
import { GroupsFormComponent } from './components/forms/groups-form/groups-form.component';
import { ProductFormComponent } from './components/forms/products-form/products-form.component';
import { CalculationContextOverviewComponent } from './components/calculation-context-overview/calculation-context-overview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SolutionVisualizationDialogComponent } from './components/dialog/solution-visualization-dialog/solution-visualization-dialog.component';
import { SolutionPreviewRenderingComponent } from './components/solution-preview-rendering/solution-preview-rendering.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ComputedStylePipe } from './pipes/computed-style.pipe';
import { AboutComponent } from './components/main/about/about.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { VisualizationModule } from 'src/lib/visualization/visualization.module';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationEffects } from './store/effects/application.effects';
import * as fromApplication from './store/reducers/application.reducer';
import { StorageManagerModule } from 'src/lib/storage-manager/storage-manager.module';

let rootReducers: { [key: string]: ActionReducer<any, any> } = {};
rootReducers[fromApplication.featureKey] = fromApplication.reducer;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    VisualizerComponent,
    GoodPreviewComponent,
    PrettyLengthPipe,
    PrettyVolumePipe,
    EditDataDialogComponent,
    SolutionPreviewComponent,
    ContainerPreviewComponent,
    GoodsPanelComponent,
    GroupsPanelComponent,
    SortedFormArrayPipe,
    SelectGroupComponent,
    SelectProductComponent,
    SelectUnitComponent,
    CalculationComponent,
    ApiCallConfiguratorDialogComponent,
    CalculationErrorPipe,
    SolutionAnimationComponent,
    NoSolutionDialogComponent,
    SolutionValidationComponent,
    SolutionValidationErrorPipe,
    LocalDataComponent,
    WidgetComponent,
    OrdersFormComponent,
    GroupsFormComponent,
    ProductFormComponent,
    CalculationContextOverviewComponent,
    SolutionVisualizationDialogComponent,
    SolutionPreviewRenderingComponent,
    ComputedStylePipe,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    NgChartsModule,
    AutomationModule,
    SharedModule,
    VisualizationModule,

    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot([ApplicationEffects]),

    StorageManagerModule,

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: PROCESS_BUILDER_CONFIG },
    { provide: PARAMS_CONFIG_TOKEN, useFactory: () => PARAMS_CONFIG },
    { provide: FUNCTIONS_CONFIG_TOKEN, useValue: FUNCTIONS_CONFIG },
    { provide: INTERFACES_CONFIG_TOKEN, useValue: INTERFACES_CONFIG },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
