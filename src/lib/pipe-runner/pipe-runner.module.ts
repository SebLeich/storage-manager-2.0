import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeRunnerComponent } from './components/pipe-runner/pipe-runner.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipelineStoreModule } from '../pipeline-store/pipeline-store.module';
import { PipelineActionPreviewComponent } from './components/pipe-runner/pipeline-action-preview/pipeline-action-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { VisualizationModule } from '../visualization/visualization.module';
import { StorageManagerModule } from '../storage-manager/storage-manager.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectPipelineComponent } from './components/pipe-runner/select-pipeline/select-pipeline.component';
import { ConsoleModule } from '../console/console.module';
import { PipeRunnerOptionsBarComponent } from './components/pipe-runner/pipe-runner-options-bar/pipe-runner-options-bar.component';


@NgModule({
  declarations: [
    PipeRunnerComponent,
    PipelineActionPreviewComponent,
    SelectPipelineComponent,
    PipeRunnerOptionsBarComponent
  ],
  imports: [
    CommonModule,
    ConsoleModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    PipelineStoreModule,
    ReactiveFormsModule,
    StorageManagerModule,
    VisualizationModule,

    RouterModule.forChild([
      { path: '**', component: PipeRunnerComponent }
    ]),
  ]
})
export class PipeRunnerModule { }
