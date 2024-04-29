import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeRunnerOptionsBarComponent } from './pipe-runner-options-bar.component';

describe('PipeRunnerOptionsBarComponent', () => {
  let component: PipeRunnerOptionsBarComponent;
  let fixture: ComponentFixture<PipeRunnerOptionsBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeRunnerOptionsBarComponent]
    });
    fixture = TestBed.createComponent(PipeRunnerOptionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
