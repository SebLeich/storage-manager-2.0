import { Component, ComponentFactoryResolver, Inject, Injector, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BasicAuthConfiguration, JWTTokenLoginConfiguration, OAuth2Configuration, StolenJWTTokenConfiguration } from 'src/app/classes/api-call-configuration';
import { API_CALL_AUTHORIZATION } from 'src/app/globals/api-call-configuration';
import { CONFIGURATION_FORM_GROUP_PROVIDER, FORM_GROUP, FORM_GROUP_PROVIDER, IConfigurationFormGroupProvider, IFormGroupProvider } from 'src/app/interfaces';
import { AccessTokenInputComponent } from '../access-token-input/access-token-input.component';
import { EndpointInputComponent } from '../endpoint-input/endpoint-input.component';
import { UsernamePasswordCombinationComponent } from '../username-password-combination/username-password-combination.component';

@Component({
  selector: 'app-api-call-configurator',
  templateUrl: './api-call-configurator.component.html',
  styleUrls: ['./api-call-configurator.component.css']
})
export class ApiCallConfiguratorComponent implements OnDestroy, OnInit {

  @ViewChild('dynamicContent', { read: ViewContainerRef }) private _ref: ViewContainerRef;

  private _subscriptions: Subscription[] = [];

  constructor(
    @Inject(FORM_GROUP_PROVIDER) public formGroupProvider: IFormGroupProvider,
    @Inject(CONFIGURATION_FORM_GROUP_PROVIDER) private _configurationFormGroupProvider: IConfigurationFormGroupProvider,
    private _formBuilder: FormBuilder,
    private _componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.formGroupProvider.formGroup = this._formBuilder.group({
      endpoint: null,
      authorization: null
    });
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
    this._subscriptions.push(...[
      this.formGroupProvider.formGroup.controls['authorization']
        .valueChanges
        .subscribe((type: API_CALL_AUTHORIZATION) => {
          this.setConfigurationForm(type);
          this.setDynamicInner(type);
        })
    ]);
  }

  setConfigurationForm(type: API_CALL_AUTHORIZATION) {
    switch (type) {
      case API_CALL_AUTHORIZATION.BASIC:
        this._configurationFormGroupProvider.configurationFormGroup = this._formBuilder.group(new BasicAuthConfiguration());
        break;
      case API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN:
        this._configurationFormGroupProvider.configurationFormGroup = this._formBuilder.group(new JWTTokenLoginConfiguration());
        break;
      case API_CALL_AUTHORIZATION.OAUTH2:
        this._configurationFormGroupProvider.configurationFormGroup = this._formBuilder.group(new OAuth2Configuration());
        break;
      case API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER:
        this._configurationFormGroupProvider.configurationFormGroup = this._formBuilder.group(new StolenJWTTokenConfiguration());
        break;
    }
  }

  setDynamicInner(type: API_CALL_AUTHORIZATION) {
    this._ref.clear();
    if (typeof type !== 'number') return;
    let injector = Injector.create({
      providers: [
        { provide: FORM_GROUP, useValue: this._configurationFormGroupProvider.configurationFormGroup }
      ]
    });
    let index = 0;
    if (type === API_CALL_AUTHORIZATION.BASIC || type === API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN) {
      let factory = this._componentFactoryResolver.resolveComponentFactory(UsernamePasswordCombinationComponent);
      this._ref.createComponent<UsernamePasswordCombinationComponent>(factory, index, injector);
      index++;
    }
    if (type === API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN) {
      let factory = this._componentFactoryResolver.resolveComponentFactory(EndpointInputComponent);
      this._ref.createComponent<EndpointInputComponent>(factory, index, injector);
      index++;
    }
    if (type === API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER) {
      let factory = this._componentFactoryResolver.resolveComponentFactory(AccessTokenInputComponent);
      this._ref.createComponent<AccessTokenInputComponent>(factory, index, injector);
      index++;
    }
  }

}
