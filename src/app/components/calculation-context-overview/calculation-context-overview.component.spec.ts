import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { CalculationContextOverviewComponent } from './calculation-context-overview.component';

describe('CalculationContextOverviewComponent', () => {
  let component: CalculationContextOverviewComponent;
  let fixture: ComponentFixture<CalculationContextOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculationContextOverviewComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: new FormGroup({
              'containerHeight': new FormControl(500),
              'containerWidth': new FormControl(500),
              'unit': new FormControl('mm')
            })
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculationContextOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
