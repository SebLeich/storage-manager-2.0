import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputWrapperComponent } from './input-wrapper/input-wrapper.component';



@NgModule({
    declarations: [
        InputWrapperComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        InputWrapperComponent
    ]
})
export class InputModule { }
