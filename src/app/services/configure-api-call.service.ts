import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasicAuthConfiguration, Configuration, JWTTokenLoginConfiguration, StolenJWTTokenConfiguration } from '../classes/api-call-configuration';
import { API_CALL_AUTHORIZATION, CONFIGURATION_ERROR } from '../globals/api-call-configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigureApiCallService {

  private _authType = new BehaviorSubject<API_CALL_AUTHORIZATION>(null);
  private _configuration = new BehaviorSubject<Configuration>(null);

  public authType$ = this._authType.asObservable();
  public configuration$ = this._configuration.asObservable();
  public configurationValid$ = combineLatest([this.authType$, this.configuration$]).pipe(map(([authType, configuration]: [API_CALL_AUTHORIZATION, Configuration]) => {
    let errors = [];

    if (typeof authType?.valueOf() !== 'number' ?? true) errors.push(CONFIGURATION_ERROR.NO_AUTH_TYPE);
    if (!configuration) errors.push(CONFIGURATION_ERROR.NO_CONFIGURATION);
    else {
      if (typeof configuration.calculationEndpoint !== 'string') errors.push(CONFIGURATION_ERROR.NO_CALCULATION_ENDPOINT);

      switch (authType?.valueOf() ?? null) {

        case API_CALL_AUTHORIZATION.BASIC.valueOf():
          if (typeof (configuration as BasicAuthConfiguration).password !== 'string') errors.push(CONFIGURATION_ERROR.NO_PASSWORD);
          if (typeof (configuration as BasicAuthConfiguration).userName !== 'string') errors.push(CONFIGURATION_ERROR.NO_USERNAME);
          break;

        case API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN.valueOf():
          if (typeof (configuration as JWTTokenLoginConfiguration).password !== 'string') errors.push(CONFIGURATION_ERROR.NO_PASSWORD);
          if (typeof (configuration as JWTTokenLoginConfiguration).userName !== 'string') errors.push(CONFIGURATION_ERROR.NO_USERNAME);
          if (typeof (configuration as JWTTokenLoginConfiguration).loginEndpoint !== 'string') errors.push(CONFIGURATION_ERROR.NO_AUTH_ENDPOINT);
          break;

        case API_CALL_AUTHORIZATION.OAUTH2.valueOf():

          break;

        case API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER.valueOf():
          if (typeof (configuration as StolenJWTTokenConfiguration).jwtToken !== 'string') errors.push(CONFIGURATION_ERROR.NO_USERNAME);
          break;

      }

    }

    return { valid: errors.length === 0, invalid: errors.length > 0, errors: errors };
  }));

  constructor() { }

  setAuthType = (type: API_CALL_AUTHORIZATION) => this._authType.next(type);
  setConfiguration = (configuration: Configuration) => this._configuration.next(configuration);
}
