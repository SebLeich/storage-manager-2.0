import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IParam } from '../../interfaces/param.interface';
import { removeIFunction } from '../actions/function.actions';
import { addIParam, addIParams, removeIParam, updateIParam, upsertIParam, upsertIParams } from '../actions/param.actions';


export const featureKey = 'param';

function sortByIdentifier(a: IParam, b: IParam) {
	return a.identifier > b.identifier ? 1 : -1;
}

export const adapter: EntityAdapter<IParam> = createEntityAdapter<IParam>({
	selectId: (arg: IParam) => arg.identifier,
	sortComparer: sortByIdentifier
});

export interface State extends EntityState<IParam> {
	ids: number[];
}

export const initialState: State = {
	ids: [],
	entities: {}
};

export const reducer = createReducer(

	initialState,

	on(addIParam, (state: State, { param }) => {
		return adapter.addOne({
			...param,
			identifier: typeof param.identifier === 'number' ? param.identifier : nextId(state),
			_isIParam: true
		}, state);
	}),

	on(addIParams, (state: State, { params }) => {
		const output: IParam[] = [];

		for (const param of params) {
			output.push({
				...param,
				identifier: typeof param.identifier === 'number' ? param.identifier : nextId(state),
				_isIParam: true
			});
		}

		return adapter.addMany(output, state);
	}),

	on(updateIParam, (state: State, { param }) => {
		const update: Update<IParam> = {
			'id': param.identifier,
			'changes': { ...param }
		}

		return adapter.updateOne(update, state);
	}),

	on(upsertIParam, (state: State, { param }) => {
		return adapter.upsertOne({
			...param,
			_isIParam: true
		}, state);
	}),

	on(upsertIParams, (state: State, { params }) => {
		return adapter.upsertMany(params.map(param => {
			return {
				...param,
				_isIParam: true
			}
		}), state);
	}),

	on(removeIFunction, (state: State, { func }) => {
		const referencedOutputParam = func.output;

		if (typeof referencedOutputParam === 'number') {
			return adapter.removeOne(referencedOutputParam, state);
		}

		return state;
	}),

	on(removeIParam, (state: State, { param }) => {
		if (param == null) {
			return state;
		}

		const key = typeof param === 'number' ? param : param.identifier;

		return adapter.removeOne(key, state);
	}),

);

export const nextId = (state: State) => {
	const ids = state && state.entities ? (Object.values(state.entities) as IParam[]).map(x => x.identifier) : [];
	return ids.length === 0 ? 0 : Math.max(...(ids.map(x => typeof x === 'number' ? x : 0))) + 1;
}
