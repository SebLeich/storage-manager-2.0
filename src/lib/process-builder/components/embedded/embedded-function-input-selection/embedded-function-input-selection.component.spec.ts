import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { EmbeddedFunctionInputSelectionComponent } from './embedded-function-input-selection.component';

describe('EmbeddedFunctionInputSelectionComponent', () => {
  let component: EmbeddedFunctionInputSelectionComponent;
  let fixture: ComponentFixture<EmbeddedFunctionInputSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedFunctionInputSelectionComponent ],
      imports: [
        ...defaultImportsConstant
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedFunctionInputSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
