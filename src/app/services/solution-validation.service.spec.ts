import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
import { AppModule } from '../app.module';
import defaultImportsConstant from '../default-imports.constant';

import { SolutionValidationService } from './solution-validation.service';

describe('SolutionValidationService', () => {
  let service: SolutionValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        SolutionValidationService
      ]
    });
    service = TestBed.inject(SolutionValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
