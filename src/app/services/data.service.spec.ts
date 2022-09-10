import { TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
import { AppModule } from '../app.module';
import defaultImportsConstant from '../default-imports.constant';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ]
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
