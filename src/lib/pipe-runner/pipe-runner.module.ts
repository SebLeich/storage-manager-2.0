import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeRunnerComponent } from './components/pipe-runner/pipe-runner.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import * as fromIPipeline from './store/reducers/pipeline.reducer';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    PipeRunnerComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,

    StoreModule.forFeature(fromIPipeline.featureKey, fromIPipeline.reducer),

    RouterModule.forChild([
      { path: '**', component: PipeRunnerComponent }
    ]),
  ]
})
export class PipeRunnerModule { }
