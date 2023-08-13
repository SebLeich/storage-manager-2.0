import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IParam, IParamDefinition } from '../interfaces';
import { of } from 'rxjs';
import { mapIParamsInterfaces } from '../extensions/rxjs/map-params-interfaces.rxjs';
import { selectSnapshot } from '../globals/select-snapshot';
import { selectIParam } from '../store/selectors';

@Injectable()
export class ParameterService {

	constructor(private _store: Store) { }

	public async parameterToInjector(args: IParam[] | number[] = []) {
		const parameters = await Promise.all(args.map(async (arg) => typeof arg === 'number' ? await selectSnapshot(this._store.select(selectIParam(arg))) : arg));	
		let mappedParameters = await selectSnapshot(of(parameters.filter((param) => param != null) as IParamDefinition[]).pipe(mapIParamsInterfaces(this._store)));
		if(!Array.isArray(mappedParameters)){
			mappedParameters = [];
		}
		
		const injector = mappedParameters.reduce((prev, curr) => {
			if (curr.defaultValue) prev[curr.normalizedName] = curr.defaultValue;
			else {
				const dummyValue = ParameterService.createPseudoObjectFromIParam(curr);
				prev[curr.normalizedName] = dummyValue;
			}

			return prev;
		}, {} as { [key: string]: object | string | number });


		return { injector, mappedParameters };
	}

	public static createPseudoObjectFromIParam(arg: IParamDefinition | null | undefined, parent: any = null, config: {
		string: () => string | undefined,
		boolean: () => boolean | undefined,
		number: () => number | undefined,
		object: () => object,
		array: () => any[],
		bigint: () => bigint | undefined,
		function: () => Function | undefined,
		symbol: () => symbol | undefined,
		undefined: () => undefined
	} = {
			string: () => undefined,
			boolean: () => undefined,
			number: () => undefined,
			object: () => { return {} },
			array: () => [],
			function: () => undefined,
			symbol: () => undefined,
			bigint: () => undefined,
			undefined: () => undefined
		}): object {

		if (!arg) return {};

		try {

			let defaultValue = arg.type === 'array' ? [] : arg.type === 'object' ? {} : arg.defaultValue;
			if (!defaultValue) defaultValue = config[arg.type]();
			if (!defaultValue) defaultValue = this._randomValueGenerator[arg.type]();

			if (Array.isArray(parent)) parent.push(defaultValue);
			else if (parent && typeof parent === 'object') parent[arg.name] = defaultValue;

			if (arg.typeDef) {
				const typeDefArray = Array.isArray(arg.typeDef) ? arg.typeDef : [arg.typeDef];

				for (const def of typeDefArray) {
					this.createPseudoObjectFromIParamDefinition(def, defaultValue);
				}
			}

			return defaultValue;

		} catch (e) {
			debugger;
			return {};
		}

	}

	public static createPseudoObjectFromIParamDefinition(arg: IParam | IParamDefinition | null | undefined, parent: any = null, config: {
		string: () => string | undefined,
		boolean: () => boolean | undefined,
		number: () => number | undefined,
		object: () => object,
		array: () => any[],
		bigint: () => bigint | undefined,
		function: () => Function | undefined,
		symbol: () => symbol | undefined,
		undefined: () => undefined
	} = {
			string: () => undefined,
			boolean: () => undefined,
			number: () => undefined,
			object: () => { return {} },
			array: () => [],
			function: () => undefined,
			symbol: () => undefined,
			bigint: () => undefined,
			undefined: () => undefined
		}): object {

		if (!arg) return {};

		let index = 0;
		let defaultValue = arg.type === 'array' ? [] : arg.type === 'object' ? {} : arg.defaultValue;

		try {

			if (!defaultValue) {
				defaultValue = config[arg.type]();
			}
			if (!defaultValue) {
				defaultValue = this._randomValueGenerator[arg.type]();
			}

			if (Array.isArray(parent)) parent.push(defaultValue);
			else if (parent && typeof parent === 'object') parent[arg.name] = defaultValue;

			if (arg.typeDef) {
				let typeDefArray = Array.isArray(arg.typeDef) ? arg.typeDef : [arg.typeDef];

				for (let def of typeDefArray) {

					this.createPseudoObjectFromIParamDefinition(def, defaultValue);

				}
			}

			index++;

		} catch (e) {
			debugger;
		} finally {
			return parent ?? defaultValue;
		}

	}

	private static _randomValueGenerator = {
		'array': () => { return [] },
		'object': () => { return {} },
		'string': () => btoa(Math.random().toString()).slice(0, 5),
		'number': () => Math.floor(Math.random() * 11),
		'boolean': () => Math.floor(Math.random() * 11) % 2 === 1,
		'bigint': () => BigInt(Math.floor(Math.random() * 11)),
		'symbol': () => Symbol('foo'),
		'undefined': () => undefined,
		'function': () => () => { }
	};
}
