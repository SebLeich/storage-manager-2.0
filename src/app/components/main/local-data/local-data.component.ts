import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, pairwise, startWith, Subscription } from 'rxjs';
import { IIdentifiable, IGroup, IOrder, IProduct } from '@smgr/interfaces';
import calculateRandomColorSharedMethod from 'src/app/methods/calculate-random-color.shared-method';
import { showAnimation } from 'src/lib/shared/animations/show';
import { v4 as generateGuid } from 'uuid';
import * as lodash from 'lodash';
import { ControlsOf } from 'src/lib/shared/globals/controls-of.type';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { bottomUpFadeInAnimation } from 'src/lib/shared/animations/bottom-up-fade.animation';
import { Unit } from 'src/app/types/unit.type';
import { addGroup, addOrder, addProduct, clearOrders, selectGroups, selectCalculationContextValid, selectContainerHeight, selectContainerWidth, selectNextProductDescription, selectOrders, selectProductByDescription, selectProducts, setContainerHeight, setContainerWidth, updateGroup, updateOrder, updateProduct, updateProductByDescription, updateOrdersByDescription } from '@smgr/store';

@Component({
  selector: 'app-local-data',
  templateUrl: './local-data.component.html',
  styleUrls: ['./local-data.component.css'],
  animations: [showAnimation, bottomUpFadeInAnimation]
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
      unit: this._formBuilder.control<Unit>('mm'),
    })
  });

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
    if (event) {
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

  private async patchFormArray(formArray: FormArray<FormGroup>, values: IIdentifiable[], type: 'group' | 'order' | 'product') {

    const actionMap = {
      group: async ([previousValue, currentValue]: IGroup[]) => {
        this._store.dispatch(updateGroup({ group: currentValue }));
      },
      order: async ([previousValue, currentValue]: IOrder[]) => {
        let value = { ...currentValue };
        if (previousValue.description !== currentValue.description) {
          const product = await selectSnapshot(this._store.select(selectProductByDescription(currentValue.description!)));
          if (!!product) {
            value.height = product.height;
            value.width = product.width;
            value.length = product.length;
          }
        }
        this._store.dispatch(updateOrder({ order: value }));
        this._store.dispatch(updateProductByDescription({ previousDescription: previousValue.description!, currentValues: currentValue as IProduct }));
      },
      product: async ([previousValue, currentValue]: IProduct[]) => {
        this._store.dispatch(updateProduct({ product: currentValue }));
        this._store.dispatch(updateOrdersByDescription({
          previousDescription: previousValue.description!,
          currentValues: {
            description: currentValue.description,
            height: currentValue.height,
            length: currentValue.length,
            width: currentValue.width
          }
        }));
      },
    }

    for (let value of values) {
      let formGroup = formArray.controls.find(control => control.value.id === value.id);
      if (formGroup) {
        if (!lodash.isEqual(formGroup.value, value)) {
          formGroup.patchValue(value, { emitEvent: false });
        }
        continue;
      }
      formGroup = this._formBuilder.group(value, { updateOn: 'blur' }) as any;
      formArray.push(formGroup!);
      this._subscription.add(
        formGroup!.valueChanges
          .pipe(startWith(formGroup?.value ?? null), pairwise())
          .subscribe(async (args) => {
            await actionMap[type](args as any);
          })
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
