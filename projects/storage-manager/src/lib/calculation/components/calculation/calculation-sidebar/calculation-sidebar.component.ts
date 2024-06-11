import { setContainerDimensions } from '@/lib/calculation/store/calculation.actions';
import { selectContainerHeight, selectContainerWidth } from '@/lib/calculation/store/calculation.selectors';
import { selectGroups } from '@/lib/groups/store/group.selectors';
import { selectOrders } from '@/lib/order/store/order.selectors';
import { AllInOneRowSolver, StartLeftBottomSolver, SuperFloSolver } from '@/lib/storage-manager/solvers';
import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, map } from 'rxjs';

@Component({
    selector: 'app-calculation-sidebar',
    templateUrl: './calculation-sidebar.component.html',
    styleUrl: './calculation-sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculationSidebarComponent {
    @Output() public showSolution = new EventEmitter<Partial<SolutionWrapper>>();

    public containerHeight$ = this._store.select(selectContainerHeight);
    public containerWidth$ = this._store.select(selectContainerWidth);
    public groups$ = this._store.select(selectGroups);
    public orders$ = this._store.select(selectOrders);
    public solutionWrappers$ = combineLatest([this.orders$, this.groups$, this.containerHeight$, this.containerWidth$])
        .pipe(
            debounceTime(500),
            map(([orders, groups, height, width]) => {
                const solutions = [];
                solutions.push(new AllInOneRowSolver().solve(height, width, groups, orders));
                solutions.push(new StartLeftBottomSolver().solve(height, width, groups, orders));
                solutions.push(new SuperFloSolver().solve(height, width, groups, orders));

                return solutions;
            })
        );

    constructor(private _store: Store) { }

    public updateContainer(height?: string, width?: string): void {
        const containerHeight = height ? parseInt(height, 10) : 0,
            containerWidth = width ? parseInt(width, 10) : 0;

        this._store.dispatch(setContainerDimensions({ containerHeight, containerWidth }));
    }

    public showCalculatedSolution({ solution, groups, calculationSteps }: SolutionWrapper): void {
        this.showSolution.emit({
            solution,
            groups,
            calculationSteps
        });
    }
}
