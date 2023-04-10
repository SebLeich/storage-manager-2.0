import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { GatewayType } from 'src/lib/process-builder/types/gateway.type';
import { EmbeddedConfigureErrorGatewayEntranceConnectionComponent } from './embedded-configure-error-gateway-entrance-connection.component';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';

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
        },
        {
          provide: ControlContainer, useFactory: () => {
            const directive = {
              control: new FormGroup({
                'entranceGatewayType': new FormControl<GatewayType>('Error')
              }) as TaskCreationFormGroup
            } as FormGroupDirective;
            return directive;
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedConfigureErrorGatewayEntranceConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
