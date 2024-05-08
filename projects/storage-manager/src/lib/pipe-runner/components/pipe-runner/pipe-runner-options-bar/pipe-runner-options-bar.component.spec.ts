import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeRunnerOptionsBarComponent } from './pipe-runner-options-bar.component';
import { MatIconModule } from '@angular/material/icon';

describe('PipeRunnerOptionsBarComponent', () => {
  let component: PipeRunnerOptionsBarComponent;
  let fixture: ComponentFixture<PipeRunnerOptionsBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PipeRunnerOptionsBarComponent],
      imports: [MatIconModule]
    });
    fixture = TestBed.createComponent(PipeRunnerOptionsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
