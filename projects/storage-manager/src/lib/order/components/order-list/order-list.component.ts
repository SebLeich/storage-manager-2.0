import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Injector, OnDestroy, OnInit, computed } from '@angular/core';
import { selectOrders } from '../../store/order.selectors';
import { Store } from '@ngrx/store';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '@/lib/storage-manager/types/order.type';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, filter, firstValueFrom, map, startWith, switchMap, timer } from 'rxjs';
import { addOrder, setOrders } from '../../store/order.actions';
import { v4 } from 'uuid';

@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnDestroy, OnInit {
    public ordersChanged$ = this._store
        .select(selectOrders)
        .pipe(
            filter(orders => {
                const formArrayValue = this.formArray?.().value ?? [];
                if (orders.length !== formArrayValue.length) {
                    return true;
                }

                return orders
                    .some((order, index) => {
                        const formOrder = formArrayValue[index] as Order;
                        return Object.keys(order).some((key) => order[key as keyof Order] !== formOrder[key as keyof Order]);
                    });
            })
        );

    public orders = toSignal(this.ordersChanged$, { injector: this._injector, initialValue: [] });

    public formArray = computed(() => {
        const orders = this.orders() as Order[];
        const formGroups = orders.map(order => new FormGroup<Partial<{ [key in keyof Order]: FormControl<Order[key]> }>>({
            id: new FormControl(order.id, { nonNullable: true }),
            description: new FormControl(order.description, { validators: [Validators.required] }),
            height: new FormControl(order.height, { nonNullable: true, validators: [Validators.min(100), Validators.max(1000), Validators.required] }),
            width: new FormControl(order.width, { nonNullable: true, validators: [Validators.min(100), Validators.max(1000), Validators.required] }),
            length: new FormControl(order.length, { nonNullable: true, validators: [Validators.min(100), Validators.max(1000), Validators.required] }),
            group: new FormControl(order.group, { nonNullable: true, validators: [Validators.required] }),
            index: new FormControl(order.index, { nonNullable: true }),
            quantity: new FormControl(order.quantity, { nonNullable: true, validators: [Validators.min(1), Validators.max(30), Validators.required] }),
            stackingAllowed: new FormControl(order.stackingAllowed ?? false, { nonNullable: true }),
            turningAllowed: new FormControl(order.turningAllowed ?? false, { nonNullable: true }),
            texture: new FormControl(order.texture, { nonNullable: true, validators: [Validators.required] })
        }), [Validators.minLength(1), Validators.maxLength(10)]);

        return new FormArray(formGroups);
    });

    public formArray$ = toObservable(this.formArray);
    public formArrayValueChanges$ = this.formArray$.pipe(switchMap(formArray => formArray.valueChanges));

    public validFormArrayControlCount$ = this.formArray$
        .pipe(
            switchMap(formArray => formArray.statusChanges.pipe(map(() => formArray))),
            map(formArray => formArray.controls.filter(control => control.valid).length),
            startWith(this.formArray().controls.filter(control => control.valid).length)
        );

    constructor(private _store: Store, private _elementRef: ElementRef, private _injector: Injector, private _destroyRef: DestroyRef) { }

    public async addOrder(): Promise<void> {
        if(this.formArray().length >= 10) {
            return;
        }
        
        this._syncOrders();

        const order = { id: v4(), quantity: 1, width: 0, height: 0, length: 0, stackingAllowed: true, turningAllowed: true } as Order;
        this._store.dispatch(addOrder({ order }));


        await this._tryFocusFirstInputFromRow('last');
        this.formArray().controls.forEach(control => control.updateValueAndValidity());
    }

    public ngOnDestroy(): void {
        const formArrayValue = this.formArray().value as Order[];
        this._syncOrders(formArrayValue);
    }

    public ngOnInit(): void {
        this.formArrayValueChanges$
            .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(1000))
            .subscribe(orders => this._syncOrders(orders as Order[]));
    }

    public async removeOrder(index: number): Promise<void> {
        this._syncOrders();
        
        const orders = this.formArray();
        orders.removeAt(index);

        this._syncOrders(orders.getRawValue() as Order[]);

        await this._tryFocusFirstInputFromRow('last');
        this.formArray().controls.forEach(control => control.updateValueAndValidity());
    }

    private _syncOrders(orders: Order[] = this.formArray().value as Order[]): void {
        this._store.dispatch(setOrders({ orders }));
    }

    private async _tryFocusFirstInputFromRow(position: 'first' | 'last'): Promise<void> {
        await firstValueFrom(timer(1));

        const rows = (this._elementRef.nativeElement as HTMLElement).querySelectorAll('.order-wrapper');
        const row = rows[position === 'first' ? 0 : rows.length - 1] as HTMLElement | null;
        if (!row) {
            return;
        }

        const input = row.querySelector('input');
        input?.focus();
    }
}
