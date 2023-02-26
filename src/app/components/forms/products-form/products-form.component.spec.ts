import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IProduct } from '@smgr/interfaces';
import { ControlsOf } from 'src/lib/shared/globals/controls-of.type';

import { ProductFormComponent } from './products-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let debugElement: DebugElement;
  const expectedFormControls: { controlName: (keyof IProduct), inputType: string }[] = [
    { controlName: 'description', inputType: 'text' },
    { controlName: 'height', inputType: 'number' },
    { controlName: 'length', inputType: 'number' },
    { controlName: 'width', inputType: 'number' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
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
              new FormGroup<ControlsOf<IProduct>>({
                height: new FormControl(100, { nonNullable: true }),
                description: new FormControl(''),
                width: new FormControl(100, { nonNullable: true }),
                length: new FormControl(100, { nonNullable: true }),
                id: new FormControl('productId', { nonNullable: true })
              }, {
                updateOn: 'blur'
              })
            ])
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
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
});
