import { createAction, props } from '@ngrx/store';
import { IGroup } from 'src/app/interfaces/i-group.interface';

export const groupActions = {
  AddGroup: '[Group] Add Group',
  AddGroups: '[Groups] Add Groups',
  RouteToGroup: '[Group] Route To Group',
  SetCurrentGroup: '[Group] Set Current Group',
  SetNextGroup: '[Group] Set Next Group'
}

export const addGroup = createAction(
  groupActions.AddGroup,
  props<{ group: IGroup }>()
);

export const addGroups = createAction(
  groupActions.AddGroups,
  props<{ groups: IGroup[] }>()
);

export const duplicateGroup = createAction(
  groupActions.SetCurrentGroup,
  props<{ duplicateGroup: IGroup }>()
);

export const removeGroup = createAction(
  groupActions.SetCurrentGroup,
  props<{ removeGroup: IGroup }>()
);

export const setCurrentGroup = createAction(
  groupActions.SetCurrentGroup,
  props<{ group: IGroup | null }>()
);

export const setNextGroup = createAction(
  groupActions.SetNextGroup
);
