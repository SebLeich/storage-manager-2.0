import { BrowserModule } from '@angular/platform-browser';
import { isDevMode, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditDataDialogComponent } from './components/dialog/edit-data-dialog/edit-data-dialog.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortedFormArrayPipe } from './pipes/sorted-form-array.pipe';
import { ApiCallConfiguratorDialogComponent } from './components/dialog/api-call-configurator-dialog/api-call-configurator-dialog.component';
import { AutomationModule } from 'src/lib/automation/automation.module';
import { SolutionAnimationComponent } from './components/solution-animation/solution-animation.component';
import { NoSolutionDialogComponent } from './components/dialog/no-solution-dialog/no-solution-dialog.component';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { PARAMS_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/param.interface';
import { FUNCTIONS_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/function.interface';
import { INTERFACES_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/interface.interface';
import { SharedModule } from 'src/lib/shared/shared.module';
import { WidgetComponent } from './components/widget/widget.component';
import { OrdersFormComponent } from './components/forms/orders-form/orders-form.component';
import { GroupsFormComponent } from './components/forms/groups-form/groups-form.component';
import { ProductFormComponent } from './components/forms/products-form/products-form.component';
import { CalculationContextOverviewComponent } from './components/calculation-context-overview/calculation-context-overview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SolutionVisualizationDialogComponent } from './components/dialog/solution-visualization-dialog/solution-visualization-dialog.component';
import { SolutionPreviewRenderingComponent } from './components/solution-preview-rendering/solution-preview-rendering.component';
import { ComputedStylePipe } from './pipes/computed-style.pipe';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { VisualizationModule } from 'src/lib/visualization/visualization.module';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationEffects } from './store/effects/application.effects';
import { StorageManagerModule } from 'src/lib/storage-manager/storage-manager.module';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from 'src/lib/shared/components/error/error.component';
import { AboutComponent, LocalDataComponent } from '@main-components';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import PROCESS_BUILDER_CONFIG from 'src/config/process-builder-config';
import PARAMS_CONFIG from 'src/config/params-config';
import FUNCTIONS_CONFIG from 'src/config/function-config.constant';
import INTERFACES_CONFIG from 'src/config/interfaces-config';

import * as fromApplication from './store/reducers/application.reducer';

const rootReducers: { [key: string]: ActionReducer<any, any> } = {};
rootReducers[fromApplication.featureKey] = fromApplication.reducer;

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'visualization' },
    { path: 'calculation', loadChildren: () => import('src/lib/calculation/calculation.module').then(m => m.CalculationModule) },
    { path: 'visualization', loadChildren: () => import('src/lib/visualization/visualization.module').then(m => m.VisualizationModule) },
    { path: '**', component: ErrorComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        EditDataDialogComponent,
        SortedFormArrayPipe,
        ApiCallConfiguratorDialogComponent,
        SolutionAnimationComponent,
        NoSolutionDialogComponent,
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
        RouterModule.forRoot(routes),
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
        { provide: INTERFACES_CONFIG_TOKEN, useFactory: () => INTERFACES_CONFIG },
        {
            provide: APP_BASE_HREF,
            useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
            deps: [PlatformLocation]
        },
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
