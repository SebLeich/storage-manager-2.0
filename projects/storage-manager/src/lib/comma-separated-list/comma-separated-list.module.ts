import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommaSeparatedListComponent } from './components/comma-separated-list/comma-separated-list.component';



@NgModule({
  declarations: [
    CommaSeparatedListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CommaSeparatedListComponent]
})
export class CommaSeparatedListModule { }
