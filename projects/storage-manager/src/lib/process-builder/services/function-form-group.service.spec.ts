import { TestBed } from '@angular/core/testing';

import { FunctionFormGroupService } from './function-form-group.service';

describe('FunctionFormGroupService', () => {
  let service: FunctionFormGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionFormGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
