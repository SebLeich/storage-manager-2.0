import { setContainerDimensions, setSolutionWrappers } from '@/lib/calculation/store/calculation.actions';
import { selectContainerHeight, selectContainerWidth, selectSolutionWrappers } from '@/lib/calculation/store/calculation.selectors';
import { selectGroups } from '@/lib/groups/store/group.selectors';
import { selectValidOrders } from '@/lib/order/store/order.selectors';
import { AllInOneRowSolver, StartLeftBottomSolver, SuperFloSolver } from '@/lib/storage-manager/solvers';
import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, map, startWith, switchMap, timer } from 'rxjs';

@Component({
    selector: 'app-calculation-sidebar',
    templateUrl: './calculation-sidebar.component.html',
    styleUrl: './calculation-sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculationSidebarComponent implements OnInit {
    @Output() public showSolution = new EventEmitter<Partial<SolutionWrapper>>();

    public containerHeight$ = this._store.select(selectContainerHeight);
    public containerWidth$ = this._store.select(selectContainerWidth);
    public groups$ = this._store.select(selectGroups);
    public orders$ = this._store.select(selectValidOrders);
    public recalculate$ = combineLatest([this.orders$, this.groups$, this.containerHeight$, this.containerWidth$]);
    public recalculationTriggered$ = this.recalculate$.pipe(switchMap(() => timer(2000).pipe(map(() => false), startWith(true))));
    public solutionWrappers$ = this._store.select(selectSolutionWrappers);

    constructor(private _store: Store, private _destroyRef: DestroyRef) { }

    public ngOnInit(): void {
        this.recalculate$
            .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(2000))
            .subscribe(([orders, groups, height, width]) => {
                const solutionWrappers = [];
                solutionWrappers.push(new AllInOneRowSolver().solve(height, width, groups, orders));
                solutionWrappers.push(new StartLeftBottomSolver().solve(height, width, groups, orders));
                solutionWrappers.push(new SuperFloSolver().solve(height, width, groups, orders));

                this._store.dispatch(setSolutionWrappers({ solutionWrappers }));
            });
    }

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
