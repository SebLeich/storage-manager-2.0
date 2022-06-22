import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/error/error.component';



@NgModule({
  declarations: [
    ErrorComponent
  ],
  exports: [
    ErrorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
