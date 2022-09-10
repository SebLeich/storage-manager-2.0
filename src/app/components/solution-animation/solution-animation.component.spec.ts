import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

import { SolutionAnimationComponent } from './solution-animation.component';

describe('SolutionAnimationComponent', () => {
  let component: SolutionAnimationComponent;
  let fixture: ComponentFixture<SolutionAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionAnimationComponent ],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        {
          provide: VisualizerComponentService,
          useValue: {
            reRenderCurrentContainer: () => {

            }
          }
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
