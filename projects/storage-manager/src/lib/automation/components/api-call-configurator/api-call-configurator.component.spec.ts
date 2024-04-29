import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { AutomationModule } from '../../automation.module';
import { CONFIGURATION_FORM_GROUP_PROVIDER, FORM_GROUP_PROVIDER, IConfigurationFormGroupProvider, IFormGroupProvider, ISubmitConfigurationProvider, SUBMIT_CONFIGURATION_PROVIDER } from '../../interfaces';

import { ApiCallConfiguratorComponent } from './api-call-configurator.component';

describe('ApiCallConfiguratorComponent', () => {
  let component: ApiCallConfiguratorComponent;
  let fixture: ComponentFixture<ApiCallConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCallConfiguratorComponent],
      imports: [
        ...defaultImportsConstant,

        AutomationModule
      ],
      providers: [
        {
          provide: FORM_GROUP_PROVIDER, useValue: {
            formGroup: new FormGroup({

            })
          } as IFormGroupProvider,
        },
        {
          provide: CONFIGURATION_FORM_GROUP_PROVIDER, useValue: {

          } as IConfigurationFormGroupProvider,
        },
        {
          provide: SUBMIT_CONFIGURATION_PROVIDER, useValue: {

          } as ISubmitConfigurationProvider
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCallConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
