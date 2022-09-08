import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersFormComponent } from './orders-form.component';

describe('OrdersFormComponent', () => {
  let component: OrdersFormComponent;
  let fixture: ComponentFixture<OrdersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
