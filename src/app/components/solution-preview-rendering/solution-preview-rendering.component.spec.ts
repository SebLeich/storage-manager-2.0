import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { SolutionPreviewStatus } from 'src/app/enumerations/solution-preview-status.enumeration';
import exemplarySolution from 'src/assets/exemplary-solution.json';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { selectSolutionPreview, upsertSolutionPreview } from '@smgr/store';
import { SolutionPreviewRenderingComponent } from './solution-preview-rendering.component';

describe('SolutionPreviewRenderingComponent', () => {
  const dataUri = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4QAiRXhpZgAATU0AKgAAAAgAAQESAAMAAAABAAEAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q==';

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

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should announce solution preview after initalization', async () => {
    fixture.detectChanges();

    const solutionPreview = await selectSnapshot(TestBed.inject(Store).select(selectSolutionPreview(exemplarySolution.solution.id)));
    expect(solutionPreview).toBeTruthy();
    expect(solutionPreview?.status).toBe(SolutionPreviewStatus.Generating);
  });

  it('should show spinner during rendering', async () => {
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#rendering-indicator'))).toBeTruthy();
  });

  it('should render solution preview and save it in store', async () => {
    fixture.detectChanges();

    await selectSnapshot(fixture.componentInstance.previewRenderingInitiallySucceeded$);
    fixture.detectChanges();

    const solutionPreview = await selectSnapshot(TestBed.inject(Store).select(selectSolutionPreview(exemplarySolution.solution.id)));
    expect(solutionPreview).toBeTruthy();
    expect(solutionPreview?.status).toBe(SolutionPreviewStatus.Succeeded);
  });

  it('should show rendered preview', async () => {
    fixture.detectChanges();

    await selectSnapshot(fixture.componentInstance.previewRenderingInitiallySucceeded$);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#solution-preview'))).toBeTruthy();
  });

  it('should not automatically render preview if any available', async () => {
    TestBed.inject(Store).dispatch(upsertSolutionPreview({
      solutionPreview: {
        status: SolutionPreviewStatus.Succeeded,
        dataURL: dataUri,
        solutionId: exemplarySolution.solution.id
      }
    }));
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('#solution-preview'))).toBeTruthy();
  });

  it('should always display image with the same height and width as the body', async () => {
    fixture.detectChanges();

    await selectSnapshot(fixture.componentInstance.previewRenderingInitiallySucceeded$);
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    const solutionPreview = fixture.debugElement.query(By.css('#solution-preview'));
    const body = fixture.debugElement.query(By.css('.body'));
    expect(solutionPreview.nativeElement.offsetHeight).toBe(body.nativeElement.offsetHeight);
    expect(solutionPreview.nativeElement.offsetWidth).toBe(body.nativeElement.offsetWidth);
  });

});
