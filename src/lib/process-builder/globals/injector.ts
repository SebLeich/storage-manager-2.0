import { InjectionToken } from "@angular/core";


export const INJECTOR_INTERFACE_TOKEN: InjectionToken<{ injector: object }> = new InjectionToken<{ injector: object }>('INJECTOR_INTERFACE');
export const INJECTOR_TOKEN: InjectionToken<{ injector: object }> = new InjectionToken<{ injector: object }>('INJECTOR');
