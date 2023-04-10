import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedOutputParamConfigurationComponent } from './embedded-output-param-configuration.component';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import defaultImportsConstant from 'src/app/default-imports.constant';

describe('EmbeddedOutputParamConfigurationComponent', () => {
  let component: EmbeddedOutputParamConfigurationComponent;
  let fixture: ComponentFixture<EmbeddedOutputParamConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [defaultImportsConstant],
      declarations: [EmbeddedOutputParamConfigurationComponent],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: new FormGroup({ interface: new FormControl(null) }) as TaskCreationFormGroup
          }
        }
      ]
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
