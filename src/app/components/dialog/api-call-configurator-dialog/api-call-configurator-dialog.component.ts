import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CONFIGURATION_FORM_GROUP_PROVIDER, FORM_GROUP_PROVIDER, SUBMIT_CONFIGURATION_PROVIDER } from 'src/app/interfaces';
import { ApiCallConfiguratorComponentService } from './api-call-configuration-dialog-component.service';

@Component({
  selector: 'app-api-call-configurator-dialog',
  templateUrl: './api-call-configurator-dialog.component.html',
  styleUrls: ['./api-call-configurator-dialog.component.css'],
  providers: [
    ApiCallConfiguratorComponentService,
    { provide: FORM_GROUP_PROVIDER, useExisting: ApiCallConfiguratorComponentService },
    { provide: CONFIGURATION_FORM_GROUP_PROVIDER, useExisting: ApiCallConfiguratorComponentService },
    { provide: SUBMIT_CONFIGURATION_PROVIDER, useExisting: ApiCallConfiguratorComponentService }
  ]
})
export class ApiCallConfiguratorDialogComponent implements OnInit {

  constructor(
    private _apiCallConfiguratorComponentService: ApiCallConfiguratorComponentService,
    private _ref: MatDialogRef<ApiCallConfiguratorDialogComponent>
  ) { }

  close = () => this._ref.close();

  ngOnInit(): void {
  }

  takeConfiguration() {
    this._apiCallConfiguratorComponentService.takeConfiguration();
    this.close();
  }

}
