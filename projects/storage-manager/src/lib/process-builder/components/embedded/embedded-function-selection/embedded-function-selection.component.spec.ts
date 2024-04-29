import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { EmbeddedFunctionSelectionComponent } from './embedded-function-selection.component';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';

describe('EmbeddedFunctionSelectionComponent', () => {
  let component: EmbeddedFunctionSelectionComponent;
  let fixture: ComponentFixture<EmbeddedFunctionSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmbeddedFunctionSelectionComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        {
          provide: ControlContainer, useFactory: () => {
            const directive = {
              control: new FormGroup({
                functionIdentifier: new FormControl(null)
              }) as TaskCreationFormGroup
            } as FormGroupDirective;
            return directive;
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmbeddedFunctionSelectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
