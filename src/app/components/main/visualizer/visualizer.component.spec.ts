import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { VISUALIZER_CONTEXT } from 'src/app/interfaces/i-visualizer-context.service';
import { setExemplarySolution } from '@smgr/store';
import { VisualizerComponentService } from './visualizer-component.service';
import { VisualizerComponent } from './visualizer.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('VisualizerComponent', () => {
  let component: VisualizerComponent;
  let fixture: ComponentFixture<VisualizerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizerComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule
      ],
      providers: [
        { provide: VISUALIZER_CONTEXT, useClass: VisualizerComponentService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hint if no solution selected', () => {
    const noSolutionHint = debugElement.query(By.css('.no-solution-selected-hint'));
    expect(noSolutionHint).toBeTruthy();
  });

  it('should display solution if one selected', async () => {
    const store = TestBed.inject(Store);
    store.dispatch(setExemplarySolution());
    fixture.detectChanges();
    await fixture.whenStable();

    fixture.detectChanges();

    const sceneVisualization = debugElement.query(By.css('app-scene-visualization'));
    expect(sceneVisualization).toBeTruthy();
  });
});
