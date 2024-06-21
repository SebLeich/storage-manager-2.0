import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculationIconComponent } from './calculation-icon/calculation-icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslationModule } from '../translation';



@NgModule({
    declarations: [CalculationIconComponent],
    exports: [CalculationIconComponent],
    imports: [
        CommonModule,
        MatTooltipModule,
        TranslationModule
    ]
})
export class CalculationIconModule { }
