import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcessBuilderWrapperComponent } from './components/process-builder-wrapper/process-builder-wrapper.component';
import { ProcessBuilderModule } from '../process-builder/process-builder.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ProcessBuilderWrapperComponent
  ],
  imports: [
    CommonModule,

    MatIconModule,

    ProcessBuilderModule,

    RouterModule.forChild([
      { path: '**', component: ProcessBuilderWrapperComponent }
    ]),

  ]
})
export class ProcessBuilderWrapperModule { }
