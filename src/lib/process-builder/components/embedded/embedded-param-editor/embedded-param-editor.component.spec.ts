import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';

import { EmbeddedParamEditorComponent } from './embedded-param-editor.component';

describe('EmbeddedParamEditorComponent', () => {
  let component: EmbeddedParamEditorComponent;
  let fixture: ComponentFixture<EmbeddedParamEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmbeddedParamEditorComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedParamEditorComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      name: new FormControl(),
      outputParamName: new FormControl(),
      isProcessOutput: new FormControl(),
      outputParamValue: new FormControl()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
