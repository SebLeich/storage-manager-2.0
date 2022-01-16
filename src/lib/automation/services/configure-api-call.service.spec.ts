import { TestBed } from '@angular/core/testing';

import { ConfigureApiCallService } from './configure-api-call.service';

describe('ConfigureApiCallService', () => {
  let service: ConfigureApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigureApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
