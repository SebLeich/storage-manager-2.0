import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { SolutionPreviewRenderingComponent } from './solution-preview-rendering.component';

describe('SolutionPreviewRenderingComponent', () => {
  let component: SolutionPreviewRenderingComponent;
  let fixture: ComponentFixture<SolutionPreviewRenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionPreviewRenderingComponent ],
      imports: [
        ...defaultImportsConstant
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolutionPreviewRenderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
