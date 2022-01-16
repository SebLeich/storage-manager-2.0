import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ReplaySubject } from "rxjs";
import { Configuration } from "src/lib/automation/classes/api-call-configuration";
import { IConfigurationFormGroupProvider, IFormGroupProvider, ISubmitConfigurationProvider } from "src/lib/automation/interfaces";
import { ConfigureApiCallService } from "src/lib/automation/services/configure-api-call.service";

@Injectable()
export class ApiCallConfiguratorComponentService implements ISubmitConfigurationProvider, IFormGroupProvider, IConfigurationFormGroupProvider {

    public formGroup: FormGroup;
    public configurationFormGroup: FormGroup;

    constructor(
        private _configureApiCallService: ConfigureApiCallService
    ) {

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