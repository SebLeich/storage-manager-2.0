import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
import { distinctUntilChanged, take } from "rxjs/operators";
import { Order } from "src/app/classes";
import { compare, nameOf } from "src/app/globals";
import { DataService } from "src/app/services/data.service";

@Injectable()
export class OrdersComponentService {

    public formGroup: FormGroup;

    private _subscriptions: Subscription[] = [];

    constructor(
        private _formBuilder: FormBuilder,
        private _dataService: DataService,
        private _snackBar: MatSnackBar
    ) {
        this._setUp();
    }

    addOrder() {
        let order = new Order();
        order.orderId = Math.max(...(this.ordersControl.value as Order[]).map(x => x.orderId), 0) + 1;
        order.quantity = 1;
        this.ordersControl.push(this._formBuilder.group(order));
        this.ordersControl.markAsDirty();
    }

    dispose() {
        for (let sub of this._subscriptions) sub.unsubscribe();
        this._subscriptions = [];
    }

    normalizeOrderIds() {
        let index = 1;
        let controls = this.ordersControl.controls;
        controls.sort((a, b) => compare((a.value as Order).orderId, (b.value as Order).orderId, true)).forEach(control => {
            (control as FormGroup).controls[nameOf<Order>('orderId')].setValue(index);
            index++;
        });
    }

    removeOrder(control: AbstractControl) {
        let index = this.ordersControl.controls.findIndex(x => x === control);
        if (index > -1) {
            this.ordersControl.removeAt(index);
            this.ordersControl.markAsDirty();
            this.normalizeOrderIds();
        }
    }

    takeOrders() {
        let orders = this.ordersControl.value;
        this._dataService.setOrders(orders);
        this.ordersControl.markAsPristine();
        this._snackBar.open(`Die ${orders.length} Bestellungen wurden zwischengespeichert.`, 'Ok', { duration: 2000 });
    }

    private _setUp() {
        this.formGroup = this._formBuilder.group({
            orders: this._formBuilder.array([]),
            containerHeight: null,
            containerWidth: null,
            unit: 'mm'
        });
        this._subscriptions.push(...[
            this._dataService.containerHeight$.pipe(distinctUntilChanged()).subscribe((height: number) => this.formGroup.controls['containerHeight'].setValue(height)),
            this._dataService.containerWidth$.pipe(distinctUntilChanged()).subscribe((width: number) => this.formGroup.controls['containerWidth'].setValue(width)),
            this._dataService.unit$.pipe(distinctUntilChanged()).subscribe((unit: string) => this.formGroup.controls['unit'].setValue(unit)),
            this.formGroup.controls['containerHeight'].valueChanges.pipe(distinctUntilChanged()).subscribe((value) => this._dataService.setContainerHeight(value)),
            this.formGroup.controls['containerWidth'].valueChanges.pipe(distinctUntilChanged()).subscribe((value) => this._dataService.setContainerWidth(value)),
            this.formGroup.controls['unit'].valueChanges.pipe(distinctUntilChanged()).subscribe((value) => this._dataService.setUnit(value)),
            this._dataService.orders$.subscribe((orders: Order[]) => {
                this.ordersControl.clear();
                console.log(orders);
                for (let order of orders) {
                    let group = this._formBuilder.group(order);
                    [nameOf<Order>('height'), nameOf<Order>('length'), nameOf<Order>('width')].forEach(x => group.controls[x].setValidators(Validators.required));
                    this.ordersControl.push(group);
                }
            })
        ]);
    }

    get ordersControl(): FormArray {
        return this.formGroup.controls['orders'] as FormArray;
    }

}