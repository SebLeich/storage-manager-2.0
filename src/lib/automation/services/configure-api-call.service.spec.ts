import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { ConfigureApiCallService } from './configure-api-call.service';

describe('ConfigureApiCallService', () => {
  let service: ConfigureApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant
      ]
    });
    service = TestBed.inject(ConfigureApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
