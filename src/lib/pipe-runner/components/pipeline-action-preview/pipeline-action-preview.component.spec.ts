import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineActionPreviewComponent } from './pipeline-action-preview.component';

describe('PipelineActionPreviewComponent', () => {
  let component: PipelineActionPreviewComponent;
  let fixture: ComponentFixture<PipelineActionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineActionPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineActionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
