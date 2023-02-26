import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IGroup, IOrder, IProduct } from '@smgr/interfaces';
import calculateRandomColorSharedMethod from 'src/app/methods/calculate-random-color.shared-method';
import { addGroup, addGroups, addOrder, addOrders, addProduct, addProducts, selectGroups, selectOrders, selectProducts } from '@smgr/store';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { v4 as generateGuid } from 'uuid';

import { LocalDataComponent } from './local-data.component';

describe('LocalDataComponent', () => {
  const exemplaryProduct: IProduct = { id: generateGuid(), height: 0, width: 0, length: 0, description: 'exemplary product' };
  const exemplaryGroup: IGroup = { id: generateGuid(), color: calculateRandomColorSharedMethod(), desc: 'exemplary group', sequenceNumber: 1 };
  const exemplaryOrder: IOrder = { id: generateGuid(), description: exemplaryProduct.description, index: 0, group: exemplaryGroup.id, height: 0, width: 0, length: 0, quantity: 1, stackingAllowed: true, turningAllowed: true } as IOrder;

  let component: LocalDataComponent;
  let fixture: ComponentFixture<LocalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocalDataComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LocalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    { groups: [exemplaryGroup], products: [] },
    { groups: [], products: [exemplaryProduct] },
    { groups: [exemplaryGroup], products: [exemplaryProduct] }
  ].forEach(entry => {

    it(`should show disabled add order menu trigger when ${entry.products.length === 0 ? 'no products' : 'some products'} and  ${entry.groups.length === 0 ? 'no groups' : 'some groups'} setted`, () => {
      const addOrderMenuTrigger = fixture.debugElement.query(By.css('#add-order-menu-trigger'));
      expect(addOrderMenuTrigger).toBeTruthy();

      const store = TestBed.inject(Store);
      store.dispatch(addProducts({ products: entry.products }));
      store.dispatch(addGroups({ groups: entry.groups }));
      fixture.detectChanges();

      expect(addOrderMenuTrigger.classes['disabled'])[entry.groups.length === 0 || entry.products.length === 0 ? 'toBeTruthy' : 'toBeFalsy']();
    });

  });

  it('should show correct disabled state of calculation control in accordance to calculation context', () => {
    const calculationControl = fixture.debugElement.query(By.css('#calculation-control'));
    expect(calculationControl).toBeTruthy();
    expect(calculationControl.classes['disabled']).toBeTruthy();

    const store = TestBed.inject(Store);
    store.dispatch(addProduct({ product: exemplaryProduct }));
    store.dispatch(addGroup({ group: exemplaryGroup }));
    store.dispatch(addOrder({ order: exemplaryOrder }));
    fixture.detectChanges();

    expect(calculationControl.classes['disabled']).toBeFalsy();
  });

  it('should clear all orders on clear orders control click', async () => {
    const clearOrdersControl = fixture.debugElement.query(By.css('#clear-orders'));
    expect(clearOrdersControl).toBeTruthy();

    const store = TestBed.inject(Store);
    store.dispatch(addOrders({ orders: [exemplaryOrder] }));
    fixture.detectChanges();

    let orders = await selectSnapshot(store.select(selectOrders));
    expect(orders.length).toBe(1);

    (clearOrdersControl.nativeElement as HTMLButtonElement).dispatchEvent(new Event('click'));
    fixture.detectChanges();

    orders = await selectSnapshot(store.select(selectOrders));
    expect(orders.length).toBe(0);
  });

  it('should add group on add control click', async () => {
    const trigger = fixture.debugElement.query(By.css("#add-group-trigger"));
    expect(trigger).toBeTruthy();

    const store = TestBed.inject(Store);
    let groups = await selectSnapshot(store.select(selectGroups));
    expect(groups.length).toBe(0);

    (trigger.nativeElement as HTMLElement).click();
    fixture.detectChanges();

    groups = await selectSnapshot(store.select(selectGroups));
    expect(groups.length).toBe(1);
  });

  it('should add product on add control click', async () => {
    const trigger = fixture.debugElement.query(By.css("#add-product-trigger"));
    expect(trigger).toBeTruthy();

    const store = TestBed.inject(Store);
    let products = await selectSnapshot(store.select(selectProducts));
    expect(products.length).toBe(0);

    (trigger.nativeElement as HTMLElement).click();
    fixture.detectChanges();

    fixture.whenStable()
      .then(async () => {
        products = await selectSnapshot(store.select(selectProducts));
        expect(products.length).toBe(1);
      });
  });

});
