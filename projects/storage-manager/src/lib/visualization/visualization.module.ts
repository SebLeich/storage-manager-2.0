import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneVisualizationComponent } from './components/scene-visualization/scene-visualization.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { RouterModule } from '@angular/router';
import { ScaffoldModule } from '../scaffold/scaffold.module';
import { VisualizationSidebarComponent } from './components/visualization/visualization-sidebar/visualization-sidebar.component';
import { StoreModule } from '@ngrx/store';
import { FEATURE_KEY, REDUCER } from './store/visualization.reducer';
import { NgLetModule } from 'ng-let';
import { ContainerPreviewComponent } from './components/container-preview/container-preview.component';
import { SharedModule } from '../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';
import { TranslationModule } from '../translation';
import { SolutionValidationComponent } from './components/solution-validation/solution-validation.component';
import { ValidationService } from './services/validation/validation.service';
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { VisualizationEffects } from './store/visualization.effects';
import { VisualizationFooterComponent } from './components/visualization/visualization-footer/visualization-footer.component';
import { SolutionGroupsComponent } from './components/solution-groups/solution-groups.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CalculationStepsComponent } from './components/calculation-steps/calculation-steps.component';
import { SceneInformationComponent } from './components/scene-visualization/scene-information/scene-information.component';
import { MatMenuModule } from '@angular/material/menu';
import { SceneSettingsComponent } from './components/scene-visualization/scene-settings/scene-settings.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputModule } from '../input/input.module';
import { BoundaryDraggableDirective } from './directives/boundary-draggable.directive';
import { ObjectSiteSelectionComponent } from './components/scene-visualization/scene-settings/object-site-selection/object-site-selection.component';
import { DownloadModule } from '../download/download.module';
import { GoodsPreviewComponent } from './components/goods-preview/goods-preview.component';



@NgModule({
    declarations: [
        BoundaryDraggableDirective,
        CalculationStepsComponent,
        ContainerPreviewComponent,
        ObjectSiteSelectionComponent,
        GoodsPreviewComponent,
        SceneInformationComponent,
        SceneSettingsComponent,
        SceneVisualizationComponent,
        SolutionGroupsComponent,
        SolutionValidationComponent,
        VisualizationComponent,
        VisualizationFooterComponent,
        VisualizationSidebarComponent
    ],
    imports: [
        CommonModule,
        DownloadModule,
        DragDropModule,
        EffectsModule.forFeature([VisualizationEffects]),
        InputModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        NgChartsModule,
        NgLetModule,
        RouterModule.forChild([
            {
                path: '',
                component: VisualizationComponent
            }
        ]),
        ScaffoldModule,
        SharedModule,
        StoreModule.forFeature(FEATURE_KEY, REDUCER),
        TranslationModule
    ],
    exports: [
        SceneVisualizationComponent,
        TranslationModule
    ],
    providers: [ValidationService]
})
export class VisualizationModule { }
