import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IVisualizerContextService, VISUALIZER_CONTEXT } from 'src/app/interfaces/i-visualizer-context.service';

import { SolutionAnimationComponent } from './solution-animation.component';

describe('SolutionAnimationComponent', () => {
  let component: SolutionAnimationComponent;
  let fixture: ComponentFixture<SolutionAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionAnimationComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
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
    fixture = TestBed.createComponent(SolutionAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
