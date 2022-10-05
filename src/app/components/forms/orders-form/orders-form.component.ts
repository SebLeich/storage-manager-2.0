import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/interfaces/i-order.interface';
import { removeOrder } from 'src/app/store/actions/i-order.actions';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in.animation';

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
  public document = document;

  private _subscription = new Subscription();

  constructor(private _controlContainer: ControlContainer, private _store: Store, private _changeDetectorRef: ChangeDetectorRef) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.ordersControl = this._controlContainer.control as FormArray;
    this.updateTotalItemCount();
    this._subscription.add(
      this.ordersControl.valueChanges.subscribe(() => {
        this.updateTotalItemCount()
      })
    );
  }

  public productChanged(productDescription: string, formGroup: FormGroup) {
    formGroup.controls['description'].setValue(productDescription);
    formGroup.updateValueAndValidity();
    this._changeDetectorRef.detectChanges();
  }

  public removeOrder(index: number) {
    const order = this.ordersControl.controls[index].value;
    this._store.dispatch(removeOrder({ removeOrder: order }));
  }

  private updateTotalItemCount() {
    this.totalItemCount = this.ordersControl.value.map(order => order.quantity).reduce((previousValue, currentValue) => previousValue += currentValue, 0);
  }

}
