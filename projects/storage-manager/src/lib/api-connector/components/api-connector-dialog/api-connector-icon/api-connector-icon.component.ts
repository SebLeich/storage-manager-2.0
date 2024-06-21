import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-api-connector-icon',
    templateUrl: './api-connector-icon.component.html',
    styleUrl: './api-connector-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiConnectorIconComponent {
    public width = input<number>(24);
}
