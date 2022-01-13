import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { showAnimation } from 'src/app/animations';
import { Order, Product } from 'src/app/classes';
import { CsvService } from 'src/app/services/csv.service';
import { DataService } from 'src/app/services/data.service';
import { OrdersComponentService } from './orders-component.service';

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

  private _subscriptions: Subscription[] = [];

  constructor(
    public dataService: DataService,
    public csvService: CsvService,
    public ordersComponentService: OrdersComponentService
  ) {

  }

  ngOnDestroy(): void {
    if (this.ordersComponentService.formGroup.dirty) this.ordersComponentService.takeOrders();
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
    this.ordersComponentService.dispose();
  }

  ngOnInit(): void {
  }

  orderCollectionToCSV(){
    this.ordersComponentService.takeOrders();
    this.csvService.downloadOrderCollectionToCSV();
  }

  setOrderProduct(product: string, formGroup: FormGroup) {
    if (typeof product !== 'string') return;
    this.dataService.products$
      .pipe(map((products: Product[]) => products.find(x => x.description === product)), filter(x => x? true: false))
      .subscribe((product: Product) => {
        formGroup.controls['description'].setValue(product.description);
        formGroup.controls['height'].setValue(product.height);
        formGroup.controls['width'].setValue(product.width);
        formGroup.controls['length'].setValue(product.length);
      });
  }

  updateProductDimension(value: number, product: string, dimension: 'length' | 'width' | 'height') {
    if (typeof product !== 'string' || typeof value !== 'number') return;
    this.dataService.products$.pipe(map(x => x.find(y => y.description === product)))
      .subscribe((product: Product) => {
        product[dimension] = value;
        this.ordersControl.controls.filter(x => (x.value as Order).description === product.description).forEach((x: FormGroup) => {
          x.controls[dimension].setValue(value);
        });
      });
  }

  get ordersControl(): FormArray {
    return this.ordersComponentService.formGroup.controls['orders'] as FormArray;
  }

}
