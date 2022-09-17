import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { SolutionPreviewStatus } from 'src/app/enumerations/solution-preview-status.enumeration';
import { selectSolutionPreview } from 'src/app/store/selectors/i-solution-preview.selectors';

import exemplarySolution from 'src/assets/exemplary-solution.json';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

import { SolutionPreviewRenderingComponent } from './solution-preview-rendering.component';

describe('SolutionPreviewRenderingComponent', () => {
  let component: SolutionPreviewRenderingComponent;
  let fixture: ComponentFixture<SolutionPreviewRenderingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionPreviewRenderingComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SolutionPreviewRenderingComponent);
    component = fixture.componentInstance;
    component.solution = exemplarySolution.solution as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should announce solution preview after initalization', async () => {
    const solutionPreview = await selectSnapshot(TestBed.inject(Store).select(selectSolutionPreview(exemplarySolution.solution.id)));
    expect(solutionPreview).toBeTruthy();
    expect(solutionPreview?.status).toBe(SolutionPreviewStatus.Generating);
  });

  it('should show spinner during rendering', async () => {
    expect(fixture.debugElement.query(By.css('#rendering-indicator'))).toBeTruthy();
  });

  it('should render solution preview and save it in store', async() => {
    await selectSnapshot(timer(2000));
    fixture.detectChanges();
    
    const solutionPreview = await selectSnapshot(TestBed.inject(Store).select(selectSolutionPreview(exemplarySolution.solution.id)));
    expect(solutionPreview).toBeTruthy();
    expect(solutionPreview?.status).toBe(SolutionPreviewStatus.Succeeded);
    expect(fixture.debugElement.query(By.css('#solution-preview'))).toBeTruthy();
  });

});
