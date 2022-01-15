import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { IConfigurationFormGroupProvider, IFormGroupProvider } from "src/app/interfaces";

@Injectable()
export class ApiCallConfiguratorComponentService implements IFormGroupProvider, IConfigurationFormGroupProvider {

    public formGroup: FormGroup;
    public configurationFormGroup: FormGroup;

}