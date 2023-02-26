import { createReducer, MetaReducer, on } from '@ngrx/store';

import exemplarySolution from 'src/assets/exemplary-solution.json';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  addGroup,
  addGroups,
  duplicateGroup,
  removeGroup,
  setCurrentGroup,
  updateGroup,
  updateGroups,
} from '../actions/group.actions';
import { v4 as generateGuid } from 'uuid';
import * as moment from 'moment';
import { IGroup } from 'src/lib/storage-manager-store/interfaces/group.interface';
import { updateCalculationAttributes } from '../actions/calculation-attribute.actions';
import { setExemplarySolution } from '../actions/solution.actions';

export const groupFeatureKey = 'group';

export interface State extends EntityState<IGroup> {
  selectedGroupId: string | null;
  ids: string[];
}

export const adapter: EntityAdapter<IGroup> = createEntityAdapter<IGroup>(
  {
    selectId: (group) => group.id,
    sortComparer: (group1, group2) => {
      return (group1!.sequenceNumber ?? -Infinity) > (group2!.sequenceNumber ?? -Infinity) ? 1 : -1;
    }
  }
);

export const initialState: State = adapter.getInitialState({
  selectedGroupId: null,
  entities: {},
  ids: [],
});

export const reducer = createReducer(
  initialState,
  on(addGroup, (state, { group }) => {
    return adapter.addOne(
      {
        ...group
      },
      state
    );
  }),
  on(addGroups, (state, { groups }) => {
    return adapter.addMany(
      groups.map((group, index) => {
        return {
          ...group,
          addedToState: moment().format(),
          index: index,
        };
      }),
      state
    );
  }),
  on(duplicateGroup, (state, { duplicateGroup }) => {
    if (!duplicateGroup) {
      return state;
    }
    return adapter.addOne({ ...duplicateGroup, id: generateGuid() }, state);
  }),
  on(removeGroup, (state, { removeGroup }) => {
    if (!removeGroup) {
      return state;
    }
    return adapter.removeOne(removeGroup.id, state);
  }),
  on(setCurrentGroup, (currentState, { group }) => {
    const state = {
      ...currentState,
      selectedGroupId: group?.id ?? null,
      selectedGroupIndex: group
        ? currentState.ids.findIndex((id) => id === group.id)
        : null,
    };
    return state;
  }),
  on(setExemplarySolution, () => {
    let entities: { [key: string]: IGroup } = {};
    for (let group of exemplarySolution.groups) {
      entities[group.id] = group;
    }
    const state = {
      entities: entities,
      ids: exemplarySolution.groups.map(group => group.id),
      selectedGroupId: null,
    } as State;
    return state;
  }),
  on(updateCalculationAttributes, (_, { groups }) => {
    const entities: { [key: string]: IGroup } = {};
    for (let group of groups ?? []) {
      entities[group.id] = group;
    }
    return {
      entities: entities,
      ids: groups?.map(group => group.id) ?? [],
      selectedGroupId: null
    };
  }),
  on(updateGroup, (currentState, { group }) => {
    return adapter.updateOne({
      id: group.id,
      changes: {
        color: group.color,
        desc: group.desc,
        sequenceNumber: group.sequenceNumber
      }
    }, currentState);
  }),
  on(updateGroups, (currentState, { groups }) => {
    return adapter.upsertMany(groups, currentState);
  })
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
