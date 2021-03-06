import { InjectionToken } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

export const FORM_GROUP = new InjectionToken("FORM_GROUP");

export const FORM_GROUP_PROVIDER = new InjectionToken("FORM_GROUP_PROVIDER");
export interface IFormGroupProvider {
    formGroup: FormGroup;
}

export const CONFIGURATION_FORM_GROUP_PROVIDER = new InjectionToken("CONFIGURATION_FORM_GROUP_PROVIDER");
export interface IConfigurationFormGroupProvider {
    configurationFormGroup: FormGroup;
}

export const SUBMIT_CONFIGURATION_PROVIDER = new InjectionToken("SUBMIT_CONFIGURATION_PROVIDER");
export interface ISubmitConfigurationProvider {
    takeConfiguration();
}