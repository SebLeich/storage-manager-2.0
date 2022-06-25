import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedInputOutputMappingComponent } from './embedded-input-output-mapping.component';

describe('EmbeddedInputOutputMappingComponent', () => {
  let component: EmbeddedInputOutputMappingComponent;
  let fixture: ComponentFixture<EmbeddedInputOutputMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedInputOutputMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedInputOutputMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
