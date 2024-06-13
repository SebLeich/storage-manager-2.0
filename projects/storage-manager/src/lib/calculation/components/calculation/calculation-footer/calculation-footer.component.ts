import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-calculation-footer',
    templateUrl: './calculation-footer.component.html',
    styleUrl: './calculation-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculationFooterComponent {
    @Output() public recalculate = new EventEmitter<void>();
}
