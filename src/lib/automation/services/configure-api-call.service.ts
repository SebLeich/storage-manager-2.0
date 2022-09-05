import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { IApiAuthorizationResponse } from '../classes/api-response';
import { ACCESS_GRANTED_STATUS, API_CALL_AUTHORIZATION, CONFIGURATION_ERROR } from '../globals';
import { IBasicAuthConfiguration } from '../interfaces/i-basic-auth-configuration.interface';
import { IConfiguration } from '../interfaces/i-configuration.interface';
import { IJwtByLoginConfiguration } from '../interfaces/i-jwt-by-login-configuration.interface';
import { IInjectedJwtTokenConfiguration } from '../interfaces/î-injected-jwt-token-configuration.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigureApiCallService {

  private _authType = new ReplaySubject<API_CALL_AUTHORIZATION>(1);
  private _configuration = new ReplaySubject<IConfiguration>(1);
  private _accessGrantedStatus = new BehaviorSubject<ACCESS_GRANTED_STATUS>(ACCESS_GRANTED_STATUS.NOT_TESTED);
  private _loginResponse = new ReplaySubject<IApiAuthorizationResponse | Error>(1);

  public authType$ = this._authType.asObservable();
  public configuration$ = this._configuration.asObservable();
  public configurationValid$ = combineLatest([this.authType$, this.configuration$]).pipe(map(([authType, configuration]: [API_CALL_AUTHORIZATION, IConfiguration]) => {
    let errors = [];

    if (typeof authType?.valueOf() !== 'number' ?? true) errors.push(CONFIGURATION_ERROR.NO_AUTH_TYPE);
    if (!configuration) errors.push(CONFIGURATION_ERROR.NO_CONFIGURATION);
    else {
      if (typeof configuration.calculationEndpoint !== 'string') errors.push(CONFIGURATION_ERROR.NO_CALCULATION_ENDPOINT);

      switch (authType?.valueOf() ?? null) {

        case API_CALL_AUTHORIZATION.BASIC.valueOf():
          if (typeof (configuration as IBasicAuthConfiguration).password !== 'string') errors.push(CONFIGURATION_ERROR.NO_PASSWORD);
          if (typeof (configuration as IBasicAuthConfiguration).userName !== 'string') errors.push(CONFIGURATION_ERROR.NO_USERNAME);
          break;

        case API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN.valueOf():
          if (typeof (configuration as IJwtByLoginConfiguration).password !== 'string') errors.push(CONFIGURATION_ERROR.NO_PASSWORD);
          if (typeof (configuration as IJwtByLoginConfiguration).userName !== 'string') errors.push(CONFIGURATION_ERROR.NO_USERNAME);
          if (typeof (configuration as IJwtByLoginConfiguration).loginEndpoint !== 'string') errors.push(CONFIGURATION_ERROR.NO_AUTH_ENDPOINT);
          break;

        case API_CALL_AUTHORIZATION.OAUTH2.valueOf():

          break;

        case API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER.valueOf():
          if (typeof (configuration as IInjectedJwtTokenConfiguration).jwtToken !== 'string') errors.push(CONFIGURATION_ERROR.NO_USERNAME);
          break;

      }

    }

    return { valid: errors.length === 0, invalid: errors.length > 0, errors: errors };
  }));
  public accessGrantedStatus$ = this._accessGrantedStatus.asObservable();
  public loginResponse$ = this._loginResponse.asObservable();

  constructor(
    private _httpClient: HttpClient
  ) { }

  async loginBearerToken(configuration: IJwtByLoginConfiguration): Promise<IApiAuthorizationResponse> {
    return selectSnapshot(
      this._httpClient
        .post(
          configuration.loginEndpoint,
          new HttpParams()
            .set('userName', configuration.userName)
            .set('password', configuration.password)
            .set('grant_type', 'password')
        )
        .pipe(
          map(response => response as IApiAuthorizationResponse)
        )
    );
  }

  setAccessGrantedStatus = (status: ACCESS_GRANTED_STATUS) => this._accessGrantedStatus.next(status);
  setAuthType = (type: API_CALL_AUTHORIZATION) => this._authType.next(type);
  setConfiguration = (configuration: IConfiguration) => this._configuration.next(configuration);
  setLoginResponse = (response: IApiAuthorizationResponse | Error) => this._loginResponse.next(response);
}
