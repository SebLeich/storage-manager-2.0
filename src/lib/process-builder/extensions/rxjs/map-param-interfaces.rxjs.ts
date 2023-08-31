import { Store } from "@ngrx/store";
import { combineLatest, forkJoin, Observable, of } from "rxjs";
import { flatMap, map, switchMap, take, tap } from "rxjs/operators";
import { IParam } from "../../interfaces/param.interface";
import { IParamDefinition } from "../../interfaces/param-definition.interface";
import { selectIInterface } from "../../store/selectors/interface.selectors";
import { mapIParamsInterfaces } from "./map-params-interfaces.rxjs";

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
            else if (typeof param?.interface === 'string') {
                return combineLatest([
                    of(param),
                    store.select(selectIInterface(param.interface))
                ]).pipe(
                    take(1),
                    map(([param, iFace]) => {
                        const result = { ...param };
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