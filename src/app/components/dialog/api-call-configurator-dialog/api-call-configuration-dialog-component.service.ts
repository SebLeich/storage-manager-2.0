import { Injectable } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { IConfigurationFormGroupProvider, IFormGroupProvider, ISubmitConfigurationProvider } from "src/lib/automation/interfaces";
import { IConfiguration } from "src/lib/automation/interfaces/i-configuration.interface";
import { ConfigureApiCallService } from "src/lib/automation/services/configure-api-call.service";

@Injectable()
export class ApiCallConfiguratorComponentService implements ISubmitConfigurationProvider, IFormGroupProvider, IConfigurationFormGroupProvider {

    public formGroup!: UntypedFormGroup;
    public configurationFormGroup!: UntypedFormGroup;

    constructor(
        private _configureApiCallService: ConfigureApiCallService
    ) {

    }

    takeConfiguration() {
        if (this.configurationFormGroup) {
            const config = this.configurationFormGroup.value as IConfiguration;
            config.calculationEndpoint = this.formGroup.controls['endpoint'].value;
            this._configureApiCallService.setAuthType(this.formGroup.controls['authorization'].value);
            this._configureApiCallService.setConfiguration(config);
        }
    }

}