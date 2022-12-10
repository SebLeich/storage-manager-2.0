import { Store } from "@ngrx/store";
import { combineLatest, forkJoin, Observable, of } from "rxjs";
import { flatMap, map, switchMap, take, tap } from "rxjs/operators";
import { IParam } from "../../globals/i-param";
import { IParamDefinition } from "../../globals/i-param-definition";
import { selectIInterface } from "../../store/selectors/interface.selectors";
import { mapIParamsInterfaces } from "./map-i-params-interfaces.rxjs-extension";

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