import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { INJECTOR_INTERFACE_TOKEN, INJECTOR_TOKEN } from 'src/lib/process-builder/globals/injector';

import { ParamEditorComponentService } from './param-editor-component.service';

describe('ParamEditorComponentService', () => {
  let service: ParamEditorComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: INJECTOR_INTERFACE_TOKEN, useValue: {} },
        { provide: INJECTOR_TOKEN, useValue: {} },
      ]
    });
    service = TestBed.inject(ParamEditorComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
