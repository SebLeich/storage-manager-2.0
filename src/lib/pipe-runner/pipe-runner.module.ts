import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeRunnerComponent } from './components/pipe-runner/pipe-runner.component';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PipelineStoreModule } from '../pipeline-store/pipeline-store.module';
import { PipelineActionPreviewComponent } from './components/pipeline-action-preview/pipeline-action-preview.component';


@NgModule({
  declarations: [
    PipeRunnerComponent,
    PipelineActionPreviewComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    PipelineStoreModule,

    RouterModule.forChild([
      { path: '**', component: PipeRunnerComponent }
    ]),
  ]
})
export class PipeRunnerModule { }
