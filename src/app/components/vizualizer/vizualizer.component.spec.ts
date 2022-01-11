import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VizualizerComponent } from './vizualizer.component';

describe('VizualizerComponent', () => {
  let component: VizualizerComponent;
  let fixture: ComponentFixture<VizualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VizualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
