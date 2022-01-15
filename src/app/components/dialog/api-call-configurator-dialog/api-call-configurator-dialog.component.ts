import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Configuration } from 'src/app/classes/api-call-configuration';
import { CONFIGURATION_FORM_GROUP_PROVIDER, FORM_GROUP_PROVIDER } from 'src/app/interfaces';
import { ConfigureApiCallService } from 'src/app/services/configure-api-call.service';
import { ApiCallConfiguratorComponentService } from './api-call-configuration-dialog-component.service';

@Component({
  selector: 'app-api-call-configurator-dialog',
  templateUrl: './api-call-configurator-dialog.component.html',
  styleUrls: ['./api-call-configurator-dialog.component.css'],
  providers: [
    ApiCallConfiguratorComponentService,
    { provide: FORM_GROUP_PROVIDER, useExisting: ApiCallConfiguratorComponentService },
    { provide: CONFIGURATION_FORM_GROUP_PROVIDER, useExisting: ApiCallConfiguratorComponentService }
  ]
})
export class ApiCallConfiguratorDialogComponent implements OnInit {

  constructor(
    private _configureApiCallService: ConfigureApiCallService,
    private _apiCallConfiguratorComponentService: ApiCallConfiguratorComponentService,
    private _ref: MatDialogRef<ApiCallConfiguratorDialogComponent>
  ) { }

  close = () => this._ref.close();

  ngOnInit(): void {
  }

  takeConfiguration() {
    if (this._apiCallConfiguratorComponentService.configurationFormGroup) {
      let config = this._apiCallConfiguratorComponentService.configurationFormGroup.value as Configuration;
      config.calculationEndpoint = this._apiCallConfiguratorComponentService.formGroup.controls['endpoint'].value;
      this._configureApiCallService.setAuthType(this._apiCallConfiguratorComponentService.formGroup.controls['authorization'].value);
      this._configureApiCallService.setConfiguration(config);
    }
    this.close();
  }

}
