import { CalculationStep } from '@/lib/storage-manager/types/calculation-step.type';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-calculation-steps',
    templateUrl: './calculation-steps.component.html',
    styleUrl: './calculation-steps.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculationStepsComponent {
    public calculationSteps = input<CalculationStep[]>([]);
}
