import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneInformationComponent } from './scene-information.component';

describe('SceneInformationComponent', () => {
  let component: SceneInformationComponent;
  let fixture: ComponentFixture<SceneInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceneInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SceneInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
