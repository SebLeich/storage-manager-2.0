import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { IGood } from "./interfaces/i-good.interface";
import { IGroup } from "./interfaces/i-group.interface";
import { ISolution } from "./interfaces/i-solution.interface";

export const GOODS_PROVIDER: InjectionToken<IGoodsProvider> = new InjectionToken<IGoodsProvider>('GOODS_PROVIDER');

export interface IGoodsProvider {
    goods$: Observable<IGood[]>;
}

export const GROUPS_PROVIDER: InjectionToken<IGroupsProvider> = new InjectionToken<IGoodsProvider>('GROUPS_PROVIDER');

export interface IGroupsProvider {
    groups$: Observable<IGroup[]>;
}

export interface ISolver {
    solve(): Observable<ISolution>;
}
