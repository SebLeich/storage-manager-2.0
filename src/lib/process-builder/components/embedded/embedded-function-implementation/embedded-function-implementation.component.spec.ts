import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedFunctionImplementationComponent } from './embedded-function-implementation.component';

describe('EmbeddedFunctionImplementationComponent', () => {
  let component: EmbeddedFunctionImplementationComponent;
  let fixture: ComponentFixture<EmbeddedFunctionImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedFunctionImplementationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedFunctionImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
