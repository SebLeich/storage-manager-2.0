import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-calculation-icon',
    templateUrl: './calculation-icon.component.html',
    styleUrl: './calculation-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculationIconComponent {
    public width = input<number>(24);
}
