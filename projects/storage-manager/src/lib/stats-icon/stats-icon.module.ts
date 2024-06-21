import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsIconComponent } from './stats-icon/stats-icon.component';



@NgModule({
    declarations: [StatsIconComponent],
    exports: [StatsIconComponent],
    imports: [
        CommonModule
    ]
})
export class StatsIconModule { }
