import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-calculation',
    templateUrl: './calculation.component.html',
    styleUrl: './calculation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculationComponent {
    constructor(private _router: Router) { }

    public visualizeSolution(wrapper: Partial<SolutionWrapper>): void {
        this._router.navigate(['/visualization'], { state: { ...wrapper } });
    }
}
