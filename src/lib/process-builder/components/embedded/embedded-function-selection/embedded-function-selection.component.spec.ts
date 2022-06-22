import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedFunctionSelectionComponent } from './embedded-function-selection.component';

describe('EmbeddedFunctionSelectionComponent', () => {
  let component: EmbeddedFunctionSelectionComponent;
  let fixture: ComponentFixture<EmbeddedFunctionSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedFunctionSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedFunctionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
