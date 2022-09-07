import { TestBed } from '@angular/core/testing';

import { BpmnjsService } from './bpmnjs.service';

describe('BpmnjsService', () => {
  let service: BpmnjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpmnjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
