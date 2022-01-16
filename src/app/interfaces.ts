import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { Good, Group, Solution } from "./classes";

export const GOODS_PROVIDER: InjectionToken<IGoodsProvider> = new InjectionToken<IGoodsProvider>('GOODS_PROVIDER');

export interface IGoodsProvider {
    goods$: Observable<Good[]>;
}

export const GROUPS_PROVIDER: InjectionToken<IGroupsProvider> = new InjectionToken<IGoodsProvider>('GROUPS_PROVIDER');

export interface IGroupsProvider {
    groups$: Observable<Group[]>;
}

export interface ISolver {
    solve(): Observable<Solution>;
}
