import { TestBed } from '@angular/core/testing';

import { SmartpackingIoService } from './smartpacking-io.service';

describe('SmartpackingIoService', () => {
  let service: SmartpackingIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartpackingIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
