import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { EmbeddedInputOutputMappingTableRowComponent } from './embedded-input-output-mapping-table-row.component';

describe('EmbeddedInputOutputMappingTableRowComponent', () => {
  let component: EmbeddedInputOutputMappingTableRowComponent;
  let fixture: ComponentFixture<EmbeddedInputOutputMappingTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedInputOutputMappingTableRowComponent ],
      imports: [
        ...defaultImportsConstant
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedInputOutputMappingTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
