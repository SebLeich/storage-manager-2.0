import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { IOrder } from 'src/app/interfaces/i-order.interface';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent implements OnInit {

  public columns: string[] = ['order', 'quantity', 'group', 'description', 'length', 'width', 'height', 'turningAllowed', 'stackingAllowed', 'controls'];
  public ordersControl!: FormArray<FormControl<IOrder>>;
  public active: string = 'order';
  public direction: SortDirection = 'asc';

  constructor(private _controlContainer: ControlContainer) { }

  public ngOnInit(): void {
    this.ordersControl = this._controlContainer.control as FormArray;
  }

  public removeOrder(index: number) {
    this.ordersControl.removeAt(index);
  }

  public setOrderProduct(event: Event, e: string) {
    console.log(e);
  }

}
