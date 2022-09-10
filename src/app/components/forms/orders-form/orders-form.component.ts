import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/interfaces/i-order.interface';
import { IProduct } from 'src/app/interfaces/i-product.interface';
import { announceOrderUpdate, removeOrder } from 'src/app/store/actions/i-order.actions';
import { selectProductByDescription } from 'src/app/store/selectors/i-product.selectors';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css'],
  animations: [fadeInAnimation]
})
export class OrdersFormComponent implements OnDestroy, OnInit {

  public columns: string[] = ['order', 'quantity', 'group', 'description', 'length', 'width', 'height', 'turningAllowed', 'stackingAllowed', 'controls'];
  public ordersControl!: FormArray<FormControl<IOrder>>;
  public active: string = 'order';
  public direction: SortDirection = 'asc';
  public totalItemCount = 0;

  private _subscription = new Subscription();

  constructor(private _controlContainer: ControlContainer, private _store: Store) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.ordersControl = this._controlContainer.control as FormArray;
    this.updateTotalItemCount();
    this._subscription.add(
      this.ordersControl.valueChanges.subscribe(() => this.updateTotalItemCount())
    );
  }

  public removeOrder(index: number) {
    const order = this.ordersControl.controls[index].value;
    this._store.dispatch(removeOrder({ removeOrder: order }));
  }

  public async setOrderProduct(productId: string, order: IOrder) {
    const product: IProduct | undefined = await selectSnapshot(this._store.select(selectProductByDescription(productId)));
    if (!product) {
      return;
    }

    const updatedOrder = {
      ...order,
      height: product.height,
      length: product.length,
      width: product.width
    } as IOrder;
    this._store.dispatch(announceOrderUpdate({ order: updatedOrder }));
  }

  private updateTotalItemCount() {
    this.totalItemCount = this.ordersControl.value.map(order => order.quantity).reduce((previousValue, currentValue) => previousValue += currentValue, 0);
  }

}
