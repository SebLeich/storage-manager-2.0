import { Store } from "@ngrx/store";
import { combineLatest, firstValueFrom, from, Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { IParamDefinition } from "../../interfaces/param-definition.interface";
import { IInterface } from "../../interfaces/interface.interface";
import { selectIInterface } from "../../store/selectors/interface.selectors";

export const mapIParamsInterfaces: ((store: Store) => ((obs: Observable<IParamDefinition[]>) => Observable<IParamDefinition[]>)) = (store: Store) => {
    return (obs: Observable<IParamDefinition[]>) => obs.pipe(
        switchMap((params: IParamDefinition[]) => {
            const mappedParamsObs = params.map(param => {
                if (param.type === 'array') {
                    return from((async () => {
                        const typeDef: IParamDefinition[] = Array.isArray(param.typeDef) && param.typeDef.length > 0? await firstValueFrom(of(param.typeDef as IParamDefinition[]).pipe(mapIParamsInterfaces(store))) : [];
                        return { ...param, typeDef: typeDef } as IParamDefinition;
                    })());
                }
                else if (typeof param.interface === 'string') {
                    return from((async () => {
                        const iFace = await firstValueFrom(store.select(selectIInterface(param.interface)));
                        let typeDef:  IParamDefinition[] | null = null;
                        if(Array.isArray(iFace?.typeDef)){
                            typeDef = await firstValueFrom(of((iFace as IInterface).typeDef).pipe(mapIParamsInterfaces(store)));
                        }

                        return { ...param, typeDef: typeDef } as IParamDefinition;
                    })());
                }
                return of(param);
            });
            
            return combineLatest(mappedParamsObs);
        })
    );
}
