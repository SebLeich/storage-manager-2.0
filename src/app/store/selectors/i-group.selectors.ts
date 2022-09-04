import { IGroup } from 'src/app/interfaces/i-group.interface';
import { createSelector } from '@ngrx/store';
import { groupFeatureKey, State } from '../reducers/i-group.reducers';

export const groupsState = (state: any) => state[groupFeatureKey] as State;

export const selectNextGroupId = createSelector(
  groupsState,
  (state: State) => {

    if (typeof state.selectedGroupId === 'string') {
      const index = Object.values(state.entities).findIndex((entry) => entry!.id === state.selectedGroupId);
      if (index === state.ids.length - 1) {
        return state.ids[0];
      }
      return state.ids[index + 1];
    } else if (state.ids.length > 0) {
      return state.ids[0];
    }
    return null;
  }
)

export const selectGroupById = (groupGuid: string | null) => createSelector(
  groupsState,
  (state: State) => {
    const group = Object.values(state.entities ?? {}).find(group => group?.id === groupGuid);
    return group ?? null;
  }
);

export const selectGroups = createSelector(
  groupsState,
  (state: State) => Object.values(state.entities ?? {}) as IGroup[]
);
