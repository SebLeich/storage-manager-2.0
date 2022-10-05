import { InjectionToken } from "@angular/core";

export const INJECTOR_INTERFACE_TOKEN = new InjectionToken<{ injector: object }>('INJECTOR_INTERFACE');
export const INJECTOR_TOKEN = new InjectionToken<{ injector: object }>('INJECTOR');
