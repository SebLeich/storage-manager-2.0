import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';

import { MethodQuickInteractionComponent } from './method-quick-interaction.component';
import { ProcessBuilderModule } from 'src/lib/process-builder/process-builder.module';
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';

describe('MethodQuickInteractionComponent', () => {
  let component: MethodQuickInteractionComponent;
  let fixture: ComponentFixture<MethodQuickInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodQuickInteractionComponent ],
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ],
      providers: [
        BpmnJsService,
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
        {
          provide: ControlContainer, useFactory: () => {
            const directive = {
              control: new FormGroup({}) as TaskCreationFormGroup
            } as FormGroupDirective;
            return directive;
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodQuickInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
