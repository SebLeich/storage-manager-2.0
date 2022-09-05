import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImports from 'src/app/default-imports.constant';

import { SolutionPreviewComponent } from './solution-preview.component';

describe('SolutionPreviewComponent', () => {
  let component: SolutionPreviewComponent;
  let fixture: ComponentFixture<SolutionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionPreviewComponent ],
      imports: [
        ...defaultImports
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
