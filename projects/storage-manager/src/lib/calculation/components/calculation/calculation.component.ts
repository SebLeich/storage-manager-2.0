import { selectValidOrders } from '@/lib/order/store/order.selectors';
import { AllInOneRowSolver, StartLeftBottomSolver, SuperFloSolver } from '@/lib/storage-manager/solvers';
import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setSolutionWrappers } from '../../store/calculation.actions';
import { selectGroups } from '@/lib/groups/store/group.selectors';
import { selectContainerHeight, selectContainerWidth } from '../../store/calculation.selectors';
import bottomUpFadeInAnimation from '@/lib/shared/animations/bottom-up-fade.animation';
import { MatDialog } from '@angular/material/dialog';
import { ApiConnectorDialogComponent } from '@/lib/api-connector/components/api-connector-dialog/api-connector-dialog.component';

@Component({
    selector: 'app-calculation',
    templateUrl: './calculation.component.html',
    styleUrl: './calculation.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [bottomUpFadeInAnimation]
})
export class CalculationComponent {
    constructor(private _router: Router, private _store: Store, private _matDialog: MatDialog) { }

    public connectAPIResource(): void {
        this._matDialog.open(ApiConnectorDialogComponent);
    }

    public recalculate(): void {
        const orders = this._store.selectSignal(selectValidOrders)(),
            groups = this._store.selectSignal(selectGroups)(),
            containerHeight = this._store.selectSignal(selectContainerHeight)(),
            containerWidth = this._store.selectSignal(selectContainerWidth)();

        const solutionWrappers = [];
        solutionWrappers.push(new AllInOneRowSolver().solve(containerHeight, containerWidth, groups, orders));
        solutionWrappers.push(new StartLeftBottomSolver().solve(containerHeight, containerWidth, groups, orders));
        solutionWrappers.push(new SuperFloSolver().solve(containerHeight, containerWidth, groups, orders));

        this._store.dispatch(setSolutionWrappers({ solutionWrappers }));
    }

    public visualizeSolution(wrapper: Partial<SolutionWrapper>): void {
        this._router.navigate(['/visualization'], { state: { ...wrapper } });
    }
}
