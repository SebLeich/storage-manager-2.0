import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CogwheelIconComponent } from './cogwheel-icon/cogwheel-icon.component';



@NgModule({
    declarations: [CogwheelIconComponent],
    exports: [CogwheelIconComponent],
    imports: [
        CommonModule
    ]
})
export class CogwheelIconModule { }
