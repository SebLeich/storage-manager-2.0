import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IVisualizerContextService, VISUALIZER_CONTEXT } from 'src/app/interfaces/i-visualizer-context.service';

import { SolutionValidationComponent } from './solution-validation.component';

describe('SolutionValidationComponent', () => {
  let component: SolutionValidationComponent;
  let fixture: ComponentFixture<SolutionValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionValidationComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule
      ],
      providers: [
        {
          provide: VISUALIZER_CONTEXT,
          useValue: {
            reRenderCompletely: () => {

            }
          } as IVisualizerContextService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
