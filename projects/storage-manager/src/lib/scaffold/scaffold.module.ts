import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScaffoldComponent } from './scaffold/scaffold.component';
import { TranslationModule } from '../translation';



@NgModule({
  declarations: [ScaffoldComponent],
  exports: [ScaffoldComponent, TranslationModule],
  imports: [
    CommonModule,
    TranslationModule
  ]
})
export class ScaffoldModule { }
