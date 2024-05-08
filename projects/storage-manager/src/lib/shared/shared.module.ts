import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';
import { AnimatedCounterDirective } from './directives/animated-counter.directive';



@NgModule({
  declarations: [
    ErrorComponent,
    AnimatedCounterDirective
  ],
  exports: [
    AnimatedCounterDirective,
    ErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
