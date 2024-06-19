import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-api-connector-dialog',
    templateUrl: './api-connector-dialog.component.html',
    styleUrl: './api-connector-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiConnectorDialogComponent {
    constructor(
        private _matDialogRef: MatDialogRef<ApiConnectorDialogComponent, any>
    ) { }

    public close(): void {
        this._matDialogRef.close();
    }
}
