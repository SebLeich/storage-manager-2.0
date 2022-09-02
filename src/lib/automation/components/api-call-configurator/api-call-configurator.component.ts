import { Component, ComponentFactoryResolver, Inject, Injector, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { BasicAuthConfiguration, Configuration, JWTTokenLoginConfiguration, OAuth2Configuration, StolenJWTTokenConfiguration } from 'src/lib/automation/classes/api-call-configuration';
import { API_CALL_AUTHORIZATION } from 'src/lib/automation/globals';
import { ConfigureApiCallService } from 'src/lib/automation/services/configure-api-call.service';
import { CONFIGURATION_FORM_GROUP_PROVIDER, FORM_GROUP, FORM_GROUP_PROVIDER, IConfigurationFormGroupProvider, IFormGroupProvider, ISubmitConfigurationProvider, SUBMIT_CONFIGURATION_PROVIDER } from '../../interfaces';
import { AccessTokenInputComponent } from '../dynamic-input/access-token-input/access-token-input.component';
import { ApiLoginTestComponent } from '../dynamic-input/api-login-test/api-login-test.component';
import { EndpointInputComponent } from '../dynamic-input/endpoint-input/endpoint-input.component';
import { UsernamePasswordCombinationComponent } from '../dynamic-input/username-password-combination/username-password-combination.component';

@Component({
  selector: 'app-api-call-configurator',
  templateUrl: './api-call-configurator.component.html',
  styleUrls: ['./api-call-configurator.component.css']
})
export class ApiCallConfiguratorComponent implements OnDestroy, OnInit {

  @ViewChild('dynamicContent', { read: ViewContainerRef }) public set ref(ref: ViewContainerRef){
    this._ref.next(ref);
  }
  private _ref = new ReplaySubject<ViewContainerRef>(1);

  private _subscriptions: Subscription[] = [];

  constructor(
    @Inject(FORM_GROUP_PROVIDER) public formGroupProvider: IFormGroupProvider,
    @Inject(CONFIGURATION_FORM_GROUP_PROVIDER) private _configurationFormGroupProvider: IConfigurationFormGroupProvider,
    @Inject(SUBMIT_CONFIGURATION_PROVIDER) private _submitConfigurationProvider: ISubmitConfigurationProvider,
    private _formBuilder: UntypedFormBuilder,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _configureApiCallService: ConfigureApiCallService
  ) {
    this.formGroupProvider.formGroup = this._formBuilder.group({
      endpoint: null,
      authorization: API_CALL_AUTHORIZATION.NO_AUTH
    });
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
    this._subscriptions.push(...[
      combineLatest([this._ref, this.formGroupProvider.formGroup.controls['authorization'].valueChanges.pipe(distinctUntilChanged())])
        .subscribe(([ref, type]: [ViewContainerRef, API_CALL_AUTHORIZATION]) => {
          this.setConfigurationForm(type);
          this.setDynamicInner(ref, type);
        }),
      combineLatest([this._ref, this._configureApiCallService.authType$, this._configureApiCallService.configuration$]).subscribe({
        next: ([ref, authType, configuration]: [ViewContainerRef, API_CALL_AUTHORIZATION, Configuration]) => {
          this.formGroupProvider.formGroup.patchValue({
            endpoint: configuration?.calculationEndpoint,
            authorization: authType
          });
          this.setConfigurationForm(authType);
          this.setDynamicInner(ref, authType);
          if(this._configurationFormGroupProvider.configurationFormGroup) this._configurationFormGroupProvider.configurationFormGroup.patchValue(configuration);
        }
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

  setDynamicInner(ref: ViewContainerRef, type: API_CALL_AUTHORIZATION) {
    if(!ref) return;
    ref.clear();
    if (typeof type !== 'number') return;
    let injector = Injector.create({
      providers: [
        { provide: FORM_GROUP, useValue: this._configurationFormGroupProvider.configurationFormGroup },
        { provide: SUBMIT_CONFIGURATION_PROVIDER, useValue: this._submitConfigurationProvider }
      ]
    });
    let index = 0;
    if (type === API_CALL_AUTHORIZATION.BASIC || type === API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN) {
      let factory = this._componentFactoryResolver.resolveComponentFactory(UsernamePasswordCombinationComponent);
      ref.createComponent<UsernamePasswordCombinationComponent>(factory, index, injector);
      index++;
    }
    if (type === API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN) {
      let factory = this._componentFactoryResolver.resolveComponentFactory(EndpointInputComponent);
      ref.createComponent<EndpointInputComponent>(factory, index, injector);
      index++;
    }
    if (type === API_CALL_AUTHORIZATION.STOLEN_JWT_BEARER) {
      let factory = this._componentFactoryResolver.resolveComponentFactory(AccessTokenInputComponent);
      ref.createComponent<AccessTokenInputComponent>(factory, index, injector);
      index++;
    }
    if (type === API_CALL_AUTHORIZATION.JWT_BEARER_LOGIN) {
      let factory = this._componentFactoryResolver.resolveComponentFactory(ApiLoginTestComponent);
      ref.createComponent<ApiLoginTestComponent>(factory, index, injector);
      index++;
    }
  }

}
