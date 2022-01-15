import { Component, Inject, OnInit } from '@angular/core';
import { ISubmitConfigurationProvider, SUBMIT_CONFIGURATION_PROVIDER } from 'src/app/interfaces';
import { ConfigureApiCallService } from 'src/app/services/configure-api-call.service';

@Component({
  selector: 'app-api-login-test',
  templateUrl: './api-login-test.component.html',
  styleUrls: ['./api-login-test.component.css']
})
export class ApiLoginTestComponent implements OnInit {

  constructor(
    @Inject(SUBMIT_CONFIGURATION_PROVIDER) public submitConfigurationProvider: ISubmitConfigurationProvider,
    private _configureApiCallService: ConfigureApiCallService
  ) { }

  ngOnInit(): void {
  }

  testLogin() {
    this.submitConfigurationProvider.setLoginResponse(null, null);
    this.submitConfigurationProvider.takeConfiguration();
    this._configureApiCallService
      .loginBearerToken()
      .subscribe(
        (result) => this.submitConfigurationProvider.setLoginResponse(true, result),
        (result) => this.submitConfigurationProvider.setLoginResponse(false, result)
      );
  }
}
