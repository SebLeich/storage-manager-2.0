import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiConnectorDialogComponent } from './components/api-connector-dialog/api-connector-dialog.component';
import { TranslationModule } from '../translation';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
    declarations: [ApiConnectorDialogComponent],
    exports: [ApiConnectorDialogComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        TranslationModule
    ]
})
export class ApiConnectorModule { }
