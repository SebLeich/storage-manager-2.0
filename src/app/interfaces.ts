import { InjectionToken } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Good, Group } from "./classes";

export const GOODS_PROVIDER: InjectionToken<IGoodsProvider> = new InjectionToken<IGoodsProvider>('GOODS_PROVIDER');

export interface IGoodsProvider {
    goods$: Observable<Good[]>;
}

export const GROUPS_PROVIDER: InjectionToken<IGroupsProvider> = new InjectionToken<IGoodsProvider>('GROUPS_PROVIDER');

export interface IGroupsProvider {
    groups$: Observable<Group[]>;
}

export const FORM_GROUP = new InjectionToken("FORM_GROUP");

export const FORM_GROUP_PROVIDER = new InjectionToken("FORM_GROUP_PROVIDER");
export interface IFormGroupProvider {
    formGroup: FormGroup;
}

export const CONFIGURATION_FORM_GROUP_PROVIDER = new InjectionToken("CONFIGURATION_FORM_GROUP_PROVIDER");
export interface IConfigurationFormGroupProvider {
    configurationFormGroup: FormGroup;
}
