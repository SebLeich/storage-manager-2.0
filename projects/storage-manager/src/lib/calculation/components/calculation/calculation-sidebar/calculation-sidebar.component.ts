import { setContainerDimensions } from '@/lib/calculation/store/calculation.actions';
import { selectContainerHeight, selectContainerWidth } from '@/lib/calculation/store/calculation.selectors';
import { selectGroups } from '@/lib/groups/store/group.selectors';
import { selectOrders } from '@/lib/order/store/order.selectors';
import { AllInOneRowSolver, StartLeftBottomSolver, SuperFloSolver } from '@/lib/storage-manager/solvers';
import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { Solution } from '@/lib/storage-manager/types/solution.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, firstValueFrom, map } from 'rxjs';

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
    public orders$ = this._store.select(selectOrders);
    public solutions$ = combineLatest([this.orders$, this.containerHeight$, this.containerWidth$])
        .pipe(
            debounceTime(500),
            map(([orders, height, width]) => {
                const solutions = [];
                solutions.push(new AllInOneRowSolver().solve(height, width, [{ id: '1', desc: 'G1', sequenceNumber: 0, color: '#fff' }], [...orders.map(order => ({ ...order, group: '1' }))]));
                solutions.push(new StartLeftBottomSolver().solve(height, width, [{ id: '1', desc: 'G1', sequenceNumber: 0, color: '#fff' }], [...orders.map(order => ({ ...order, group: '1' }))]));
                solutions.push(new SuperFloSolver().solve(height, width, [{ id: '1', desc: 'G1', sequenceNumber: 0, color: '#fff' }], [...orders.map(order => ({ ...order, group: '1' }))]));

                return solutions;
            })
        );

    constructor(private _store: Store) { }

    public updateContainer(height?: string, width?: string): void {
        const containerHeight = height ? parseInt(height, 10) : 0,
            containerWidth = width ? parseInt(width, 10) : 0;

        this._store.dispatch(setContainerDimensions({ containerHeight, containerWidth }));
    }

    public async showCalculatedSolution(solution: Solution): Promise<void> {
        const groups = await firstValueFrom(this._store.select(selectGroups));
        this.showSolution.emit({
            solution,
            groups,
            calculationSteps: []
        });
    }
}
