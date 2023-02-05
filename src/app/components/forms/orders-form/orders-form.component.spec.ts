import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { OrdersFormComponent } from './orders-form.component';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ControlsOf } from 'src/lib/shared/globals/controls-of.type';
import { IOrder } from 'src/lib/storage-manager-store/interfaces/order.interface';
import { By } from '@angular/platform-browser';

describe('OrdersFormComponent', () => {
  let component: OrdersFormComponent;
  let fixture: ComponentFixture<OrdersFormComponent>;
  let debugElement: DebugElement;
  const expectedFormControls: { controlName: (keyof IOrder), inputType: string }[] = [
    { controlName: 'height', inputType: 'number' },
    { controlName: 'length', inputType: 'number' },
    { controlName: 'width', inputType: 'number' },
    { controlName: 'index', inputType: 'number' },
    { controlName: 'quantity', inputType: 'number' },
  ];
  const expectedCheckboxes: (keyof IOrder)[] = ['stackingAllowed', 'turningAllowed'];

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
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  expectedFormControls.forEach(control => {
    it(`should contain form control for ${control.controlName}`, () => {
      const controlDebugElement = debugElement.query(By.css(`[formcontrolname=${control.controlName}]`));
      expect(controlDebugElement).toBeTruthy();
      expect((controlDebugElement.nativeElement as HTMLInputElement).type).toBe(control.inputType);
    });
  });

  expectedCheckboxes.forEach(controlName => {
    it(`should contain checkbox for ${controlName}`, () => {
      const controlDebugElement = debugElement.query(By.css(`mat-checkbox[formcontrolname=${controlName}]`));
      expect(controlDebugElement).toBeTruthy();
    });
  });
});
