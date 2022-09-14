import { Store } from "@ngrx/store";
import { combineLatest, forkJoin, Observable, of } from "rxjs";
import { flatMap, map, switchMap, take, tap } from "rxjs/operators";
import { IParam } from "./i-param";
import { selectIInterface } from "../store/selectors/i-interface.selectors";
import { IInterface } from "./i-interface";
import { IParamDefinition } from "./i-param-definition";

export const mapIParamInterfaces = (store: Store) => {
    return (obs: Observable<IParam | null | undefined>) => obs.pipe(
        switchMap((param: IParam | null | undefined) => {

            if (param?.type === 'array') {
                return of({ ...param }).pipe(
                    flatMap((param: IParam) =>
                        forkJoin([
                            of(param),
                            of(param.typeDef as IParam[]).pipe(mapIParamsInterfaces(store))
                        ])
                    ),
                    tap(([param, typeDef]: [IParam, IParamDefinition[]]) => param.typeDef = typeDef),
                    map(([param, _]) => param)
                );
            }
            else if (typeof param?.interface === 'number') {
                return combineLatest([
                    of(param),
                    store.select(selectIInterface(param.interface))
                ]).pipe(
                    take(1),
                    map(([param, iFace]) => {
                        let result = { ...param };
                        result.typeDef = iFace!.typeDef;
                        return result as IParam;
                    }),
                    flatMap((param: IParam) =>
                        forkJoin([
                            of(param),
                            of(param.typeDef as IParam[]).pipe(mapIParamsInterfaces(store))
                        ])
                    ),
                    tap(([param, typeDef]: [IParam, IParamDefinition[]]) => param.typeDef = typeDef),
                    map(([param, _]) => param)
                );
            }
            return of(param);
        })
    );
}

export const mapIParamsInterfaces: ((store: Store) => ((obs: Observable<IParam[]>) => Observable<IParam[]>)) = (store: Store) => {
    return (obs: Observable<IParam[]>) => obs.pipe(
        switchMap((params: IParam[]) => {
            return combineLatest(
                params.map(param => {
                    if (param.type === 'array') {
                        return of({ ...param }).pipe(
                            flatMap((param: IParam) =>
                                forkJoin([
                                    of(param),
                                    of(param.typeDef as IParam[]).pipe(mapIParamsInterfaces(store))
                                ])
                            ),
                            tap(([param, typeDef]: [IParam, IParamDefinition[]]) => param.typeDef = typeDef),
                            map(([param, _]) => param)
                        );
                    }
                    else if (typeof param.interface === 'number') {
                        return combineLatest([
                            of(param),
                            store.select(selectIInterface(param.interface))
                        ]).pipe(
                            take(1),
                            map(([param, iFace]: [IParam, IInterface | null | undefined]) => {
                                let result = { ...param };
                                result.typeDef = iFace?.typeDef;
                                return result as IParam;
                            }),
                            flatMap((param: IParam) =>
                                forkJoin([
                                    of(param),
                                    of(param.typeDef as IParam[]).pipe(mapIParamsInterfaces(store))
                                ])
                            ),
                            tap(([param, typeDef]: [IParam, IParamDefinition[]]) => param.typeDef = typeDef),
                            map(([param, _]) => param)
                        );
                    }
                    return of(param);
                })
            )
        })
    );
}