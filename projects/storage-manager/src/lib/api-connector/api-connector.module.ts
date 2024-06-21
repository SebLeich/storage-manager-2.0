import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiConnectorDialogComponent } from './components/api-connector-dialog/api-connector-dialog.component';
import { TranslationModule } from '../translation';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InputModule } from '../input/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiConnectorIconComponent } from './components/api-connector-dialog/api-connector-icon/api-connector-icon.component';



@NgModule({
    declarations: [ApiConnectorIconComponent, ApiConnectorDialogComponent],
    exports: [ApiConnectorDialogComponent],
    imports: [
        CommonModule,
        InputModule,
        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        ReactiveFormsModule,
        TranslationModule
    ]
})
export class ApiConnectorModule { }
