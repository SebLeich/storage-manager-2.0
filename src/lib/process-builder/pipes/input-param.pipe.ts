import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { IInputParam } from '../interfaces/input-param.interface';
import { selectIInterface } from '../store/selectors/interface.selectors';
import { Observable, forkJoin, map, of, take } from 'rxjs';
import { IFunction } from '../interfaces';

@Pipe({
	name: 'inputParam'
})
export class InputParamPipe implements PipeTransform {

	constructor(private _store: Store) { }

	public transform(func: IFunction | undefined, tagClassList = 'input-param'): Observable<string | { item: string, tagClassList?: string }[]> {
		if (!func) {
			return of([{ item: '', tagClassList }]);
		}

		const inputParams: (string | IInputParam)[] = func?.inputTemplates === 'dynamic' ? ['dynamic'] : func?.inputTemplates ?? [];

		return forkJoin(
			inputParams
				.map(param => {
					if (typeof param === 'string') return of({ item: param === 'dynamic' ? 'dynamic type' : param, tagClassList });
					if (!param) return of({ item: '', tagClassList });

					if ((param.type === 'object' || param.type === 'array') && typeof param.interface === 'string') {
						return this._store.select(selectIInterface(param.interface)).pipe(
							take(1),
							map(iFace => {
								if (!iFace) return { item: '', tagClassList: `${tagClassList} ${param.optional? 'optional': ''}` };

								const prefix = param.type === 'array' ? 'array of ' : '', suffix = param.type === 'array' ? 's' : '';
								const item = `${param.name} (${prefix}${iFace.name}${suffix})`;

								return { item, tagClassList: `${tagClassList} ${param.optional? 'optional': ''}` };
							})
						);
					}

					return of({ item: `${param.name} (${param.type})`, tagClassList: `${tagClassList} ${param.optional? 'optional': ''}` });
				})
		);
	}

}
