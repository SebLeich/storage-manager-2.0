import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-calculation',
    templateUrl: './calculation.component.html',
    styleUrl: './calculation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculationComponent {

}
