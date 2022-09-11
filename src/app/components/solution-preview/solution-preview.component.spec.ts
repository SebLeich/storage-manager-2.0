import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImports from 'src/app/default-imports.constant';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

import { SolutionPreviewComponent } from './solution-preview.component';

describe('SolutionPreviewComponent', () => {
  let component: SolutionPreviewComponent;
  let fixture: ComponentFixture<SolutionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolutionPreviewComponent],
      imports: [
        ...defaultImports,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        { provide: VisualizerComponentService, useValue: {} }
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
