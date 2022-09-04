import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CsvService } from 'src/app/services/csv.service';
import { showAnimation } from 'src/lib/shared/animations/show';
import { OrdersComponentService } from './orders-component.service';

import * as fromIProductState from 'src/app/store/reducers/i-product.reducers';

import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { selectProductByDescription } from 'src/app/store/selectors/i-product.selectors';
import { IOrder } from 'src/app/interfaces/i-order.interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrdersComponentService],
  animations: [showAnimation]
})
export class OrdersComponent implements OnDestroy, OnInit {

  columns: string[] = ['order', 'quantity', 'group', 'description', 'length', 'width', 'height', 'turningAllowed', 'stackingAllowed', 'controls'];

  active: string = 'order';
  direction: SortDirection = 'asc';

  private _subscriptions = new Subscription();

  constructor(
    public csvService: CsvService,
    public ordersComponentService: OrdersComponentService,
    private _productStore: Store<fromIProductState.State>
  ) {

  }

  ngOnDestroy(): void {
    if (this.ordersComponentService.formGroup.dirty) this.ordersComponentService.takeOrders();
    this._subscriptions.unsubscribe();
    this.ordersComponentService.dispose();
  }

  ngOnInit(): void {
  }

  orderCollectionToCSV() {
    this.ordersComponentService.takeOrders();
    this.csvService.downloadOrderCollectionToCSV();
  }

  async setOrderProduct(productDescription: string, formGroup: UntypedFormGroup) {
    const product = await selectSnapshot(this._productStore.select(selectProductByDescription(productDescription)));
    if (!product) {
      return;
    }

    formGroup.controls['description'].setValue(product.description);
    formGroup.controls['height'].setValue(product.height);
    formGroup.controls['width'].setValue(product.width);
    formGroup.controls['length'].setValue(product.length);
  }

  async updateProductDimension(value: number, productDescription: string, dimension: 'length' | 'width' | 'height') {
    if (productDescription == null || typeof value !== 'number') return;

    const product = await selectSnapshot(this._productStore.select(selectProductByDescription(productDescription)));
    if (!product) {
      return;
    }

    product[dimension] = value;
    this.ordersControl.controls
      .filter(x => (x.value as IOrder).description === product.description)
      .forEach((x) => {
        (x as UntypedFormGroup).controls[dimension].setValue(value);
      });
  }

  get ordersControl(): UntypedFormArray {
    return this.ordersComponentService.formGroup.controls['orders'] as UntypedFormArray;
  }

}
