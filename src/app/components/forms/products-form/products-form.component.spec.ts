import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IProduct } from 'src/app/interfaces/i-product.interface';
import { ControlsOf } from 'src/lib/shared/globals/controls-of.type';

import { ProductFormComponent } from './products-form.component';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFormComponent ],
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
              })
            ])
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
