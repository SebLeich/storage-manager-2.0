import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessBuilderComponent } from './process-builder.component';

describe('ProcessBuilderComponent', () => {
  let component: ProcessBuilderComponent;
  let fixture: ComponentFixture<ProcessBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
