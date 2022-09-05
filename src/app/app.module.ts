import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

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
import { MatToolbarModule } from '@angular/material/toolbar';
import { SolutionPreviewComponent } from './components/solution-preview/solution-preview.component';
import { ContainerPreviewComponent } from './components/container-preview/container-preview.component';
import { NgChartsModule } from 'ng2-charts';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GoodsPanelComponent } from './components/goods-panel/goods-panel.component';
import { GroupsPanelComponent } from './components/groups-panel/groups-panel.component';
import { OrdersComponent } from './components/main/orders/orders.component';
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
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { PARAMS_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-param';
import { FUNCTIONS_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-function';
import { INTERFACES_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-interface';

import { SharedModule } from 'src/lib/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';

import * as fromICalculationContextState from './store/reducers/i-calculation-context.reducers';
import { ICalculationContextEffects } from './store/effects/i-calculation-context.effects';

import * as fromIGroupState from './store/reducers/i-group.reducers';
import { IGroupEffects } from './store/effects/i-group.effects';

import * as fromIOrderState from './store/reducers/i-order.reducers';
import { IOrderEffects } from './store/effects/i-order.effects';

import * as fromIProductState from './store/reducers/i-product.reducers';
import { IProductEffects } from './store/effects/i-product.effects';

import * as fromISolutionState from './store/reducers/i-solution.reducers';
import { ISolutionEffects } from './store/effects/i-solution.effects';

let rootStoreFeatures: any = {};
rootStoreFeatures[fromICalculationContextState.calculationContextFeatureKey] = fromICalculationContextState.calculationContextReducer;
rootStoreFeatures[fromIGroupState.groupFeatureKey] = fromIGroupState.groupReducer;
rootStoreFeatures[fromIOrderState.orderFeatureKey] = fromIOrderState.orderReducer;
rootStoreFeatures[fromIProductState.productFeatureKey] = fromIProductState.productReducer;
rootStoreFeatures[fromISolutionState.solutionFeatureKey] = fromISolutionState.solutionReducer;

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
    OrdersComponent,
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
    SolutionValidationErrorPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    MatTooltipModule,
    MatToolbarModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    NgChartsModule,
    AutomationModule,
    SharedModule,

    StoreModule.forRoot(rootStoreFeatures, {

    }),
    EffectsModule.forRoot([ICalculationContextEffects, IGroupEffects, IOrderEffects, IProductEffects, ISolutionEffects]),
  ],
  providers: [
    { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: PROCESS_BUILDER_CONFIG },
    { provide: PARAMS_CONFIG_TOKEN, useValue: PARAMS_CONFIG },
    { provide: FUNCTIONS_CONFIG_TOKEN, useValue: FUNCTIONS_CONFIG },
    { provide: INTERFACES_CONFIG_TOKEN, useValue: INTERFACES_CONFIG },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
