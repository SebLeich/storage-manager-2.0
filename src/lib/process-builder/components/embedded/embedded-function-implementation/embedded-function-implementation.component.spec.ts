import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';

import { EmbeddedFunctionImplementationComponent } from './embedded-function-implementation.component';

describe('EmbeddedFunctionImplementationComponent', () => {
  let component: EmbeddedFunctionImplementationComponent;
  let fixture: ComponentFixture<EmbeddedFunctionImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmbeddedFunctionImplementationComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedFunctionImplementationComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      name: new FormControl(),
      implementation: new FormControl(),
      outputParamName: new FormControl(),
      canFail: new FormControl(),
      normalizedOutputParamName: new FormControl(),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
