import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedInputOutputMappingTableRowComponent } from './embedded-input-output-mapping-table-row.component';

describe('EmbeddedInputOutputMappingTableRowComponent', () => {
  let component: EmbeddedInputOutputMappingTableRowComponent;
  let fixture: ComponentFixture<EmbeddedInputOutputMappingTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedInputOutputMappingTableRowComponent ]
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
