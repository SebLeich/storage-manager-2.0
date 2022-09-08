import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IGroup } from 'src/app/interfaces/i-group.interface';
import { IOrder } from 'src/app/interfaces/i-order.interface';
import { IProduct } from 'src/app/interfaces/i-product.interface';
import calculateRandomColorSharedMethod from 'src/app/methods/calculate-random-color.shared-method';
import { setExemplaryInputData } from 'src/app/store/actions/i-calculation-attribute.actions';
import { selectGroups } from 'src/app/store/selectors/i-group.selectors';
import { selectProducts } from 'src/app/store/selectors/i-product.selectors';
import { showAnimation } from 'src/lib/shared/animations/show';

import { v4 as generateGuid } from 'uuid';

@Component({
  selector: 'app-local-data',
  templateUrl: './local-data.component.html',
  styleUrls: ['./local-data.component.css'],
  animations: [showAnimation]
})
export class LocalDataComponent implements OnInit {

  public groups$ = this._store.select(selectGroups);
  public products$ = this._store.select(selectProducts);

  public formGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder, private _store: Store) {
    this.formGroup = this._formBuilder.group({
      orders: this._formBuilder.array<IOrder>([]),
      groups: this._formBuilder.array<IGroup>([])
    })
  }

  public addGroup() {
    const sequenceNumber = Math.max(...(this.groupsControl.value as IGroup[]).map(order => order.sequenceNumber), 0) + 1;
    this.groupsControl.push(this._formBuilder.group<IGroup>({
      id: generateGuid(),
      color: calculateRandomColorSharedMethod(),
      desc: null,
      sequenceNumber: sequenceNumber
    }));
  }

  public addOrder(product: IProduct, group: IGroup) {
    const index = Math.max(...(this.ordersControl.value as IOrder[]).map(order => order.index), 0) + 1;
    this.ordersControl.push(
      this._formBuilder.group({
        id: generateGuid(),
        index: index,
        description: product.description,
        group: group.id,
        height: product.height,
        width: product.width,
        length: product.length,
        quantity: 1,
        stackingAllowed: false,
        turningAllowed: true,
      } as IOrder)
    );
  }

  public clearGroups() {
    this.groupsControl.clear();
  }

  public clearOrders() {
    this.ordersControl.clear();
  }

  public ngOnInit(): void {
    this._store.dispatch(setExemplaryInputData());
  }

  private get groupsControl(): FormArray {
    return this.formGroup.controls['groups'] as FormArray;
  }

  private get ordersControl(): FormArray {
    return this.formGroup.controls['orders'] as FormArray;
  }

}
