import { selectOrders } from '@/lib/order/store/order.selectors';
import { AllInOneRowSolver, StartLeftBottomSolver, SuperFloSolver } from '@/lib/storage-manager/solvers';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, map } from 'rxjs';

@Component({
    selector: 'app-calculation-sidebar',
    templateUrl: './calculation-sidebar.component.html',
    styleUrl: './calculation-sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculationSidebarComponent {
    public orders$ = this._store.select(selectOrders);
    public solutions$ = this.orders$.pipe(
        debounceTime(500),
        map(orders => {
            const solutions = [];
            solutions.push(new AllInOneRowSolver().solve(1000, 1000, [{ id: '1', desc: 'G1', sequenceNumber: 0, color: '#fff' }], [...orders.map(order => ({ ...order, group: '1' }))]));
            solutions.push(new StartLeftBottomSolver().solve(1000, 1000, [{ id: '1', desc: 'G1', sequenceNumber: 0, color: '#fff' }], [...orders.map(order => ({ ...order, group: '1' }))]));
            solutions.push(new SuperFloSolver().solve(1000, 1000, [{ id: '1', desc: 'G1', sequenceNumber: 0, color: '#fff' }], [...orders.map(order => ({ ...order, group: '1' }))]));

            return solutions;
        })
    );

    constructor(private _store: Store) { }
}
