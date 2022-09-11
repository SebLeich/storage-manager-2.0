import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';

import { EmbeddedInputOutputMappingComponent } from './embedded-input-output-mapping.component';

describe('EmbeddedInputOutputMappingComponent', () => {
  let component: EmbeddedInputOutputMappingComponent;
  let fixture: ComponentFixture<EmbeddedInputOutputMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedInputOutputMappingComponent ],
      imports: [
        ...defaultImportsConstant
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedInputOutputMappingComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      outputParamValue: new FormControl()
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
