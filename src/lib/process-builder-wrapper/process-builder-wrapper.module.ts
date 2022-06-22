import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProcessBuilderWrapperComponent } from './components/process-builder-wrapper/process-builder-wrapper.component';
import { ProcessBuilderModule } from '../process-builder/process-builder.module';
import { MatIconModule } from '@angular/material/icon';
import { MethodQuickInteractionComponent } from './components/method-quick-interaction/method-quick-interaction.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProcessBuilderWrapperComponent,
    MethodQuickInteractionComponent
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatInputModule,

    ReactiveFormsModule,

    ProcessBuilderModule,

    RouterModule.forChild([
      { path: '**', component: ProcessBuilderWrapperComponent }
    ]),

  ]
})
export class ProcessBuilderWrapperModule { }
