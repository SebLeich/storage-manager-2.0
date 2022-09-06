import { Injectable } from "@angular/core";
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { nameOf } from "src/app/globals";
import { IOrder } from "src/app/interfaces/i-order.interface";
import { v4 as generateGuid } from 'uuid';

import * as fromICalculationAttributesState from 'src/app/store/reducers/i-calculation-attribute.reducers';
import * as fromIOrderState from 'src/app/store/reducers/i-order.reducers';

import { selectContainerHeight, selectContainerWidth, selectUnit } from "src/app/store/selectors/i-calculation-attribute.selectors";
import { setContainerHeight, setContainerWidth, setUnit } from "src/app/store/actions/i-calculation-attribute.actions";
import { addOrders } from "src/app/store/actions/i-order.actions";
import { selectOrders } from "src/app/store/selectors/i-order.selectors";

@Injectable()
export class OrdersComponentService {

    public formGroup!: UntypedFormGroup;

    private _subscriptions = new Subscription();

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _snackBar: MatSnackBar,
        private _calculationAttributesStore: Store<fromICalculationAttributesState.State>,
        private _orderStore: Store<fromIOrderState.State>,
    ) {
        this._setUp();
    }

    addOrder() {
        const order: IOrder = {
            id: generateGuid(),
            description: null,
            quantity: 1,
            width: 0,
            length: 0,
            height: 0,
            stackingAllowed: false,
            turningAllowed: false
        }
        this.ordersControl.push(this._formBuilder.group(order));
        this.ordersControl.markAsDirty();
    }

    dispose = () => this._subscriptions.unsubscribe();

    removeOrder(control: AbstractControl) {
        let index = this.ordersControl.controls.findIndex(x => x === control);
        if (index > -1) {
            this.ordersControl.removeAt(index);
            this.ordersControl.markAsDirty();
        }
    }

    takeOrders() {
        let orders = this.ordersControl.value;
        this._orderStore.dispatch(addOrders(orders));
        this.ordersControl.markAsPristine();
        this._snackBar.open(`${orders.length} orders are saved`, 'ok', { duration: 2000 });
    }

    private _setUp() {
        this.formGroup = this._formBuilder.group({
            orders: this._formBuilder.array([]),
            containerHeight: null,
            containerWidth: null,
            unit: 'mm'
        });
        this._subscriptions.add(...[
            this._calculationAttributesStore.select(selectContainerHeight).pipe(distinctUntilChanged()).subscribe((height: number) => this.formGroup.controls['containerHeight'].setValue(height, { emitEvent: false })),
            this._calculationAttributesStore.select(selectContainerWidth).pipe(distinctUntilChanged()).subscribe((width: number) => this.formGroup.controls['containerWidth'].setValue(width, { emitEvent: false })),
            this._calculationAttributesStore.select(selectUnit).pipe(distinctUntilChanged()).subscribe((unit: string) => this.formGroup.controls['unit'].setValue(unit, { emitEvent: false })),
            this.formGroup.controls['containerHeight'].valueChanges.pipe(distinctUntilChanged()).subscribe((height) => this._calculationAttributesStore.dispatch(setContainerHeight(height))),
            this.formGroup.controls['containerWidth'].valueChanges.pipe(distinctUntilChanged()).subscribe((width) => this._calculationAttributesStore.dispatch(setContainerWidth(width))),
            this.formGroup.controls['unit'].valueChanges.pipe(distinctUntilChanged()).subscribe((unit) => this._calculationAttributesStore.dispatch(setUnit(unit))),
            this._orderStore.select(selectOrders).subscribe((orders: IOrder[]) => {
                this.ordersControl.clear();
                for (let order of orders) {
                    let group = this._formBuilder.group(order);
                    [nameOf<IOrder>('height'), nameOf<IOrder>('length'), nameOf<IOrder>('width')].forEach(x => group.controls[x].setValidators(Validators.required));
                    this.ordersControl.push(group);
                }
            })
        ]);
    }

    get ordersControl(): UntypedFormArray {
        return this.formGroup.controls['orders'] as UntypedFormArray;
    }

}