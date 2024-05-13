import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationSidebarComponent } from './visualization-sidebar.component';

describe('VisualizationSidebarComponent', () => {
  let component: VisualizationSidebarComponent;
  let fixture: ComponentFixture<VisualizationSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizationSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
