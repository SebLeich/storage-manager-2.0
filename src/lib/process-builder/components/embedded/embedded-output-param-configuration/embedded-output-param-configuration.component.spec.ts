import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedOutputParamConfigurationComponent } from './embedded-output-param-configuration.component';

describe('EmbeddedOutputParamConfigurationComponent', () => {
  let component: EmbeddedOutputParamConfigurationComponent;
  let fixture: ComponentFixture<EmbeddedOutputParamConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedOutputParamConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbeddedOutputParamConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
