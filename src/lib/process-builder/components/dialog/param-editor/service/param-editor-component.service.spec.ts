import { TestBed } from '@angular/core/testing';

import { ParamEditorComponentService } from './param-editor-component.service';

describe('ParamEditorComponentService', () => {
  let service: ParamEditorComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamEditorComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
