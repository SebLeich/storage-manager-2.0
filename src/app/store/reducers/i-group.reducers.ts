import { createReducer, MetaReducer, on, Store } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { InjectionToken } from '@angular/core';
import {
  addGroup,
  addGroups,
  duplicateGroup,
  removeGroup,
  setCurrentGroup,
} from '../actions/i-group.actions';
import { v4 as generateGuid } from 'uuid';
import * as moment from 'moment';
import { IGroup } from 'src/app/interfaces/i-group.interface';

export const groupFeatureKey = 'group';

export const ORDER_REDUCER_TOKEN = new InjectionToken<Store<State>>(
  'Group Reducers'
);

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

export const groupReducer = createReducer(
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
  })
);

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
