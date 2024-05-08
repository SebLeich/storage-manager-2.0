import { Component, Inject, OnInit } from '@angular/core';
import { ACCESS_GRANTED_STATUS } from 'src/lib/automation/globals';
import { ISubmitConfigurationProvider, SUBMIT_CONFIGURATION_PROVIDER } from 'src/lib/automation/interfaces';
import { ConfigureApiCallService } from 'src/lib/automation/services/configure-api-call.service';

@Component({
  selector: 'app-api-login-test',
  templateUrl: './api-login-test.component.html',
  styleUrls: ['./api-login-test.component.css']
})
export class ApiLoginTestComponent implements OnInit {

  constructor(
    @Inject(SUBMIT_CONFIGURATION_PROVIDER) public submitConfigurationProvider: ISubmitConfigurationProvider,
    public configureApiCallService: ConfigureApiCallService
  ) { }

  ngOnInit(): void {
  }

  async testLogin() {
    this.configureApiCallService.setAccessGrantedStatus(ACCESS_GRANTED_STATUS.NOT_TESTED);
    this.submitConfigurationProvider.takeConfiguration();

    try {
      const result = await this.configureApiCallService.loginBearerToken({} as any);
      this.configureApiCallService.setLoginResponse(result);
      this.configureApiCallService.setAccessGrantedStatus(ACCESS_GRANTED_STATUS.SUCCEEDED);
    } catch (error) {
      this.configureApiCallService.setLoginResponse(error as Error);
      this.configureApiCallService.setAccessGrantedStatus(ACCESS_GRANTED_STATUS.FAILED);
    }
  }

  ACCESS_GRANTED_STATUS = ACCESS_GRANTED_STATUS;
}
