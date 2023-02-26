import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeRunnerComponent } from './components/pipe-runner/pipe-runner.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipelineStoreModule } from '../pipeline-store/pipeline-store.module';
import { PipelineActionPreviewComponent } from './components/pipeline-action-preview/pipeline-action-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { VisualizationModule } from '../visualization/visualization.module';
import { StorageManagerModule } from '../storage-manager/storage-manager.module';


@NgModule({
  declarations: [
    PipeRunnerComponent,
    PipelineActionPreviewComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    PipelineStoreModule,
    StorageManagerModule,
    VisualizationModule,

    RouterModule.forChild([
      { path: '**', component: PipeRunnerComponent }
    ]),
  ]
})
export class PipeRunnerModule { }
