import { Store } from "@ngrx/store";
import { combineLatest, forkJoin, iif, Observable, of } from "rxjs";
import { flatMap, map, switchMap, take, tap } from "rxjs/operators";
import { IParam } from "../../interfaces/param.interface";
import { IParamDefinition } from "../../interfaces/param-definition.interface";
import { IInterface } from "../../interfaces/interface.interface";
import { selectIInterface } from "../../store/selectors/interface.selectors";

export const mapIParamsInterfaces: ((store: Store) => ((obs: Observable<IParam[]>) => Observable<IParam[]>)) = (store: Store) => {
    return (obs: Observable<IParam[]>) => obs.pipe(
        switchMap((params: IParam[]) => {
            const mappedParamsObs = params.map(param => {
                if (param.type === 'array') {
                    return of({ ...param }).pipe(
                        flatMap((param: IParam) =>
                            forkJoin([
                                of(param),
                                iif(() => Array.isArray(param.typeDef), of(param.typeDef as IParam[]).pipe(mapIParamsInterfaces(store)), of([] as IParamDefinition[]))
                            ])
                        ),
                        tap(([param, typeDef]: [IParam, IParamDefinition[]]) => param.typeDef = typeDef),
                        map(([param, _]) => param)
                    );
                }
                else if (typeof param.interface === 'string') {
                    return store.select(selectIInterface(param.interface)).pipe(
                        take(1),
                        map((iFace: IInterface | null) => {
                            const result = { ...param };
                            result.typeDef = iFace?.typeDef ?? null;
                            return result as IParam;
                        }),
                        flatMap((param: IParam) =>
                            forkJoin([
                                of(param),
                                of(param.typeDef as IParam[]).pipe(mapIParamsInterfaces(store))
                            ])
                        ),
                        map(([param, typeDef]: [IParam, IParamDefinition[]]) => {
                            return {
                                ...param,
                                typeDef: typeDef
                            } as IParam;
                        })
                    );
                }
                return of(param);
            });
            return combineLatest(mappedParamsObs);
        })
    );
}
