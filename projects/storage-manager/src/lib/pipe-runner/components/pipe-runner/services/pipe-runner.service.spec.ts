import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { PipeRunnerService } from './pipe-runner.service';
import defaultImportsConstant from 'src/app/default-imports.constant';

describe('PipeRunnerService', () => {
  let service: PipeRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [...defaultImportsConstant, RouterTestingModule],
      providers: [PipeRunnerService]
    });
    service = TestBed.inject(PipeRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
