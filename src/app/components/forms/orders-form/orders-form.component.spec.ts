import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { OrdersFormComponent } from './orders-form.component';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ControlsOf } from 'src/lib/shared/globals/controls-of.type';
import { IOrder } from 'src/app/interfaces/i-order.interface';

describe('OrdersFormComponent', () => {
  let component: OrdersFormComponent;
  let fixture: ComponentFixture<OrdersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersFormComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: new FormArray([
              new FormGroup<ControlsOf<IOrder>>({
                description: new FormControl(''),
                group: new FormControl('', { nonNullable: true }),
                id: new FormControl('', { nonNullable: true }),
                height: new FormControl(0, { nonNullable: true }),
                width: new FormControl(0, { nonNullable: true }),
                length: new FormControl(0, { nonNullable: true }),
                index: new FormControl(0, { nonNullable: true }),
                quantity: new FormControl(0, { nonNullable: true }),
                stackingAllowed: new FormControl(false, { nonNullable: true }),
                turningAllowed: new FormControl(false, { nonNullable: true })
              })
            ])
          }
        }
      ]
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
