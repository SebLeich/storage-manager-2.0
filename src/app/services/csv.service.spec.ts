import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
import { AppModule } from '../app.module';
import defaultImportsConstant from '../default-imports.constant';

import { CsvService } from './csv.service';

describe('CsvService', () => {
  let service: CsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ]
    });
    service = TestBed.inject(CsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
