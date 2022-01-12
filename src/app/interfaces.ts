import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Good, Group } from "./classes";

export const GOODS_PROVIDER: InjectionToken<IGoodsProvider> = new InjectionToken<IGoodsProvider>('GOODS_PROVIDER');

export class IGoodsProvider {
    goods$: Observable<Good[]>;
}

export const GROUPS_PROVIDER: InjectionToken<IGroupsProvider> = new InjectionToken<IGoodsProvider>('GROUPS_PROVIDER');

export class IGroupsProvider {
    groups$: Observable<Group[]>;
}
