import { TestBed } from '@angular/core/testing';

import { ConsoleService } from './console.service';
import { ConsoleModule } from '../console.module';

describe('ConsoleService', () => {
  let service: ConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConsoleModule]
    });
    service = TestBed.inject(ConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
