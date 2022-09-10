import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

import { SolutionValidationComponent } from './solution-validation.component';

describe('SolutionValidationComponent', () => {
  let component: SolutionValidationComponent;
  let fixture: ComponentFixture<SolutionValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolutionValidationComponent ],
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
    fixture = TestBed.createComponent(SolutionValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
