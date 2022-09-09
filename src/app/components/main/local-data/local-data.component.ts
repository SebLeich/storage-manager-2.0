import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, Subscription } from 'rxjs';
import { IEntity } from 'src/app/interfaces/i-entity.interface';
import { IGroup } from 'src/app/interfaces/i-group.interface';
import { IOrder } from 'src/app/interfaces/i-order.interface';
import { IProduct } from 'src/app/interfaces/i-product.interface';
import calculateRandomColorSharedMethod from 'src/app/methods/calculate-random-color.shared-method';
import { setExemplaryInputData } from 'src/app/store/actions/i-calculation-attribute.actions';
import { addGroup, updateGroup } from 'src/app/store/actions/i-group.actions';
import { addOrder, clearOrders, announceOrderUpdate } from 'src/app/store/actions/i-order.actions';
import { addProduct, announceProductUpdate } from 'src/app/store/actions/i-product.actions';
import { selectGroups } from 'src/app/store/selectors/i-group.selectors';
import { selectOrders } from 'src/app/store/selectors/i-order.selectors';
import { selectProducts } from 'src/app/store/selectors/i-product.selectors';
import { showAnimation } from 'src/lib/shared/animations/show';

import { v4 as generateGuid } from 'uuid';
import * as lodash from 'lodash';

@Component({
  selector: 'app-local-data',
  templateUrl: './local-data.component.html',
  styleUrls: ['./local-data.component.css'],
  animations: [showAnimation]
})
export class LocalDataComponent implements OnDestroy, OnInit {

  public groups$ = this._store.select(selectGroups);
  public products$ = this._store.select(selectProducts);

  public formGroup!: FormGroup;

  private _subscription = new Subscription();

  constructor(private _formBuilder: FormBuilder, private _store: Store) {
    this.formGroup = this._formBuilder.group({
      orders: this._formBuilder.array<IOrder>([], { updateOn: 'blur' }),
      groups: this._formBuilder.array<IGroup>([], { updateOn: 'blur' }),
      products: this._formBuilder.array<IProduct>([], { updateOn: 'blur' }),
    })
  }

  public addGroup() {
    const sequenceNumber = Math.max(...(this.groupsControl.value as IGroup[]).map(order => order.sequenceNumber), 0) + 1;
    this._store.dispatch(addGroup({
      group: {
        id: generateGuid(),
        color: calculateRandomColorSharedMethod(),
        desc: null,
        sequenceNumber: sequenceNumber
      }
    }));
  }

  public addOrder(product: IProduct, group: IGroup) {
    const index = Math.max(...(this.ordersControl.value as IOrder[]).map(order => order.index), 0) + 1;
    this._store.dispatch(addOrder({
      order: {
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
      } as IOrder
    }));
  }

  public addProduct() {
    this._store.dispatch(addProduct({
      product: {
        id: generateGuid(),
        description: null,
        height: 0,
        length: 0,
        width: 0,
      } as IProduct
    }));
  }

  public clearGroups() {
    this.groupsControl.clear();
  }

  public clearOrders() {
    this._store.dispatch(clearOrders());
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this._store.dispatch(setExemplaryInputData());
    this._subscription.add(this._store.select(selectGroups).subscribe(async groups => await this.patchFormArray(this.groupsControl, groups, 'group')));
    this._subscription.add(this._store.select(selectOrders).subscribe(async orders => await this.patchFormArray(this.ordersControl, orders, 'order')));
    this._subscription.add(this._store.select(selectProducts).subscribe(async products => await this.patchFormArray(this.productsControl, products, 'product')));
  }

  private async patchFormArray(formArray: FormArray<FormControl<IEntity>>, values: IEntity[], type: 'group' | 'order' | 'product') {

    const actionMap = {
      'group': (value: IGroup) => this._store.dispatch(updateGroup({ group: value })),
      'order': (value: IOrder) => this._store.dispatch(announceOrderUpdate({ order: value })),
      'product': (value: IProduct) => this._store.dispatch(announceProductUpdate({ product: value })),
    }

    for (let value of values) {
      let formGroup = formArray.controls.find(control => control.value.id === value.id);
      if (formGroup) {
        if (!lodash.isEqual(formGroup.value, value)) {
          formGroup.patchValue(value);
        }
        continue;
      }
      formGroup = this._formBuilder.group(value, { updateOn: 'blur' }) as any;
      formArray.push(formGroup!);
      formGroup!.valueChanges
        .pipe(debounceTime(50))
        .subscribe((updatedValue) => actionMap[type](updatedValue as any));
    }

    let toRemove = formArray.controls
      .map((control, index) => {
        return { control, index };
      })
      .filter((entry) => values.map(value => value.id).indexOf(entry.control.value.id) === -1)
      .sort((entryA, entryB) => entryA.index < entryB.index? 1: -1);

    while (toRemove.length > 0) {
      formArray.removeAt(toRemove[0].index);
      toRemove = toRemove.slice(1);
    }

  }

  private get groupsControl(): FormArray {
    return this.formGroup.controls['groups'] as FormArray;
  }

  private get ordersControl(): FormArray {
    return this.formGroup.controls['orders'] as FormArray;
  }

  private get productsControl(): FormArray {
    return this.formGroup.controls['products'] as FormArray;
  }

}
