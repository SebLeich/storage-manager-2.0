import { Store } from "@ngrx/store";
import { combineLatest, forkJoin, Observable, of } from "rxjs";
import { flatMap, map, switchMap, take, tap } from "rxjs/operators";
import { IParam } from "../../globals/i-param";
import { IParamDefinition } from "../../globals/i-param-definition";
import { IInterface } from "../../interfaces/i-interface.interface";
import { selectIInterface } from "../../store/selectors/interface.selectors";

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
                        return store.select(selectIInterface(param.interface)).pipe(
                            take(1),
                            map((iFace: IInterface | null) => {
                                let result = { ...param };
                                result.typeDef = iFace?.typeDef ?? null;
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
