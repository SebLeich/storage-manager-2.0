import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';

import { EmbeddedFunctionImplementationComponent } from './embedded-function-implementation.component';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { CodeEditorModule } from '@/lib/code-editor/code-editor.module';
import { CodemirrorRepository } from '@/lib/core/codemirror.repository';

describe('EmbeddedFunctionImplementationComponent', () => {
  let component: EmbeddedFunctionImplementationComponent;
  let fixture: ComponentFixture<EmbeddedFunctionImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmbeddedFunctionImplementationComponent],
      imports: [
        ...defaultImportsConstant,

        CodeEditorModule
      ],
      providers: [
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
        {
          provide: ControlContainer, useFactory: () => {
            const directive = {
              control: new FormGroup({
                canFail: new FormControl(),
                implementation: new FormControl(null),
                name: new FormControl(''),
                outputParamName: new FormControl('')
              }) as TaskCreationFormGroup
            } as FormGroupDirective;
            return directive;
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedFunctionImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly update interface control', () => {
    component.formGroup.controls.implementation!.setValue(CodemirrorRepository.stringToTextLeaf([
      'async (injector) => {',
      'return injector.mySolution',
      '}'
    ]));

    expect(component).toBeTruthy();
  });
});
