import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionWrapperPreviewComponent } from './solution-wrapper-preview.component';

describe('SolutionWrapperPreviewComponent', () => {
  let component: SolutionWrapperPreviewComponent;
  let fixture: ComponentFixture<SolutionWrapperPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolutionWrapperPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionWrapperPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
