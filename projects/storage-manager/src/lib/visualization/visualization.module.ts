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



@NgModule({
    declarations: [
        ContainerPreviewComponent,
        SceneVisualizationComponent,
        VisualizationComponent,
        VisualizationSidebarComponent
    ],
    imports: [
        CommonModule,
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
    ]
})
export class VisualizationModule { }
