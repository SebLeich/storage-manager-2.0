import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';

import { EmbeddedConfigureErrorGatewayEntranceConnectionComponent } from './embedded-configure-error-gateway-entrance-connection.component';

describe('EmbeddedConfigureErrorGatewayEntranceConnectionComponent', () => {
  let component: EmbeddedConfigureErrorGatewayEntranceConnectionComponent;
  let fixture: ComponentFixture<EmbeddedConfigureErrorGatewayEntranceConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmbeddedConfigureErrorGatewayEntranceConnectionComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        {
          provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {
            errorGatewayConfig: {
              successConnectionName: 'success'
            }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedConfigureErrorGatewayEntranceConnectionComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      entranceGatewayType: new FormControl()
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});