import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeRunnerComponent } from './pipe-runner.component';

describe('PipeRunnerComponent', () => {
  let component: PipeRunnerComponent;
  let fixture: ComponentFixture<PipeRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipeRunnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipeRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
