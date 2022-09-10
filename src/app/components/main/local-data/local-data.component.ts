import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, debounceTime, map, Observable, Subscription, timer } from 'rxjs';
import { IEntity } from 'src/app/interfaces/i-entity.interface';
import { IGroup } from 'src/app/interfaces/i-group.interface';
import { IOrder } from 'src/app/interfaces/i-order.interface';
import { IProduct } from 'src/app/interfaces/i-product.interface';
import calculateRandomColorSharedMethod from 'src/app/methods/calculate-random-color.shared-method';
import { setContainerHeight, setContainerWidth } from 'src/app/store/actions/i-calculation-attribute.actions';
import { addGroup, updateGroup } from 'src/app/store/actions/i-group.actions';
import { addOrder, clearOrders, announceOrderUpdate } from 'src/app/store/actions/i-order.actions';
import { addProduct, announceProductUpdate } from 'src/app/store/actions/i-product.actions';
import { selectGroups } from 'src/app/store/selectors/i-group.selectors';
import { selectOrders } from 'src/app/store/selectors/i-order.selectors';
import { selectNextProductDescription, selectProducts } from 'src/app/store/selectors/i-product.selectors';
import { showAnimation } from 'src/lib/shared/animations/show';

import { v4 as generateGuid } from 'uuid';
import * as lodash from 'lodash';

import { selectContainerHeight, selectContainerWidth } from 'src/app/store/selectors/i-calculation-attribute.selectors';
import { selectCalculationContextValid } from 'src/app/store/selectors/i-calculation-context.selectors';
import { ControlsOf } from 'src/lib/shared/globals/controls-of.type';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { widgetFadeInAnimation } from 'src/lib/shared/animations/bottom-up-fade.animation';

@Component({
  selector: 'app-local-data',
  templateUrl: './local-data.component.html',
  styleUrls: ['./local-data.component.css'],
  animations: [ showAnimation, widgetFadeInAnimation ]
})
export class LocalDataComponent implements OnDestroy, OnInit {

  public groups$: Observable<IGroup[]> = this._store.select(selectGroups);
  public orders$: Observable<IOrder[]> = this._store.select(selectOrders);
  public products$: Observable<IProduct[]> = this._store.select(selectProducts);

  public calculationContextValid$ = this._store.select(selectCalculationContextValid);
  public noGroupsOrProducts$ = combineLatest([this.groups$, this.products$]).pipe(map(([groups, products]) => groups.length === 0 || products.length === 0));
  public noOrdersAvailable$ = this.orders$.pipe(map(orders => orders.length === 0));

  public formGroup = this._formBuilder.group({
    orders: this._formBuilder.array<IOrder>([], { updateOn: 'blur' }),
    groups: this._formBuilder.array<IGroup>([], { updateOn: 'blur' }),
    products: this._formBuilder.array<IProduct>([], { updateOn: 'blur' }),
    calculationContext: this._formBuilder.group({
      containerHeight: this._formBuilder.control<number>(1000, { updateOn: 'blur' }),
      containerWidth: this._formBuilder.control<number>(1000, { updateOn: 'blur' }),
      unit: this._formBuilder.control<'mm' | 'cm' | 'm' | 'km'>('mm'),
    })
  });

  public animationState: 'shown' | 'hidden' = 'hidden';

  private _subscription = new Subscription();

  constructor(private _formBuilder: FormBuilder, private _store: Store, private _changeDetectorRef: ChangeDetectorRef) { }

  public addGroup() {
    const sequenceNumber = Math.max(...(this.groupsControl.value as IGroup[]).map(order => order.sequenceNumber), 0) + 1;
    this._store.dispatch(addGroup({
      group: {
        id: generateGuid(),
        color: calculateRandomColorSharedMethod(),
        desc: `group ${sequenceNumber}`,
        sequenceNumber: sequenceNumber
      }
    }));
  }

  public addOrder(event: MouseEvent, product: IProduct, group: IGroup) {
    if(event){
      event.stopPropagation();
    }
    const existingOrderFormGroup = this.ordersControl
      .controls
      .find(control => control.value.description === product.description && control.value.group === group.id);

    if (existingOrderFormGroup) {
      const quantity = existingOrderFormGroup.controls['quantity'].value;
      existingOrderFormGroup.controls['quantity'].setValue(quantity + 1);
      return;
    }

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

  public async addProduct() {
    const productDescription = await selectSnapshot(this._store.select(selectNextProductDescription()));
    this._store.dispatch(addProduct({
      product: {
        id: generateGuid(),
        description: productDescription,
        height: 1000,
        length: 1000,
        width: 1000,
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
    this._subscription.add(this.calculationContextControl.controls['containerHeight'].valueChanges.subscribe((containerHeight) => this._store.dispatch(setContainerHeight({ height: (containerHeight! < 1 ? 1000 : containerHeight)! }))));
    this._subscription.add(this.calculationContextControl.controls['containerWidth'].valueChanges.subscribe((containerWidth) => this._store.dispatch(setContainerWidth({ width: (containerWidth! < 1 ? 1000 : containerWidth)! }))));
    this._subscription.add(this._store.select(selectContainerHeight).subscribe(containerHeight => this.patchContainerHeight(containerHeight)));
    this._subscription.add(this._store.select(selectContainerWidth).subscribe(containerWidth => this.patchContainerWidth(containerWidth)));
    this._subscription.add(this._store.select(selectGroups).subscribe(async groups => await this.patchFormArray(this.groupsControl, groups, 'group')));
    this._subscription.add(this._store.select(selectOrders).subscribe(async orders => await this.patchFormArray(this.ordersControl, orders, 'order')));
    this._subscription.add(this._store.select(selectProducts).subscribe(async products => await this.patchFormArray(this.productsControl, products, 'product')));
    this._subscription.add(timer(100).subscribe(() => {
      this.animationState = 'shown';
      this._changeDetectorRef.detectChanges();
    }));
  }

  private patchContainerHeight(containerHeight: number) {
    if (this.calculationContextControl.controls['containerHeight'].value !== containerHeight) {
      this.calculationContextControl.controls['containerHeight'].setValue(containerHeight);
    }
  }

  private patchContainerWidth(containerWidth: number) {
    if (this.calculationContextControl.controls['containerWidth'].value !== containerWidth) {
      this.calculationContextControl.controls['containerWidth'].setValue(containerWidth);
    }
  }

  private async patchFormArray(formArray: FormArray<FormGroup>, values: IEntity[], type: 'group' | 'order' | 'product') {

    const actionMap = {
      group: (value: IGroup) => this._store.dispatch(updateGroup({ group: value })),
      order: (value: IOrder) => this._store.dispatch(announceOrderUpdate({ order: value })),
      product: (value: IProduct) => this._store.dispatch(announceProductUpdate({ product: value })),
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
      this._subscription.add(
        formGroup!.valueChanges
          .pipe(debounceTime(50))
          .subscribe((updatedValue) => actionMap[type](updatedValue as any))
      );
    }

    let toRemove = formArray.controls
      .map((control, index) => {
        return { control, index };
      })
      .filter((entry) => values.map(value => value.id).indexOf(entry.control.value.id) === -1)
      .sort((entryA, entryB) => entryA.index < entryB.index ? 1 : -1);

    while (toRemove.length > 0) {
      formArray.removeAt(toRemove[0].index);
      toRemove = toRemove.slice(1);
    }

  }

  private get calculationContextControl() {
    return this.formGroup.controls['calculationContext'];
  }

  private get groupsControl(): FormArray {
    return this.formGroup.controls['groups'] as FormArray;
  }

  private get ordersControl(): FormArray<FormGroup<ControlsOf<IOrder>>> {
    return this.formGroup.controls['orders'] as FormArray;
  }

  private get productsControl(): FormArray<FormGroup<ControlsOf<IProduct>>> {
    return this.formGroup.controls['products'] as FormArray;
  }

}
