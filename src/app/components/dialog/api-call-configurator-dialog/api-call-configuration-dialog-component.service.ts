import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { Configuration } from "src/app/classes/api-call-configuration";
import { IConfigurationFormGroupProvider, IFormGroupProvider, ISubmitConfigurationProvider } from "src/app/interfaces";
import { ConfigureApiCallService } from "src/app/services/configure-api-call.service";

@Injectable()
export class ApiCallConfiguratorComponentService implements ISubmitConfigurationProvider, IFormGroupProvider, IConfigurationFormGroupProvider {

    private _loginResponse = new ReplaySubject<any>(1);
    loginResponse$ = this._loginResponse.asObservable();

    private _succeeded = new ReplaySubject<boolean>(1);
    succeeded$ = this._succeeded.asObservable();

    public formGroup: FormGroup;
    public configurationFormGroup: FormGroup;

    constructor(
        private _configureApiCallService: ConfigureApiCallService
    ) {

    }

    setLoginResponse(succeeded, result) {
        this._succeeded.next(succeeded);
        this._loginResponse.next(result);
    }

    takeConfiguration() {
        if (this.configurationFormGroup) {
            let config = this.configurationFormGroup.value as Configuration;
            config.calculationEndpoint = this.formGroup.controls['endpoint'].value;
            this._configureApiCallService.setAuthType(this.formGroup.controls['authorization'].value);
            this._configureApiCallService.setConfiguration(config);
        }
    }

}