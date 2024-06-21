import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
    selector: 'app-api-connector-dialog',
    templateUrl: './api-connector-dialog.component.html',
    styleUrl: './api-connector-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiConnectorDialogComponent {
    public formGroup = new FormGroup({
        url: new FormControl('', [Validators.required, Validators.pattern(/^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}(\/[^/#?]+)+$/)]),
        method: new FormControl('POST', [Validators.required]),
        bearer: new FormControl(''),
        basic: new FormGroup({
            username: new FormControl(''),
            password: new FormControl('')
        })
    });

    constructor(
        private _matDialogRef: MatDialogRef<ApiConnectorDialogComponent, any>,
        private matIconRegistry: MatIconRegistry
    ) {
        this.matIconRegistry.addSvgIcon(
            `doodle_settings`,
            `/assets/doodles/settings.svg`
        );
    }

    public close(): void {
        this._matDialogRef.close();
    }
}
