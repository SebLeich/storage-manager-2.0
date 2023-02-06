import { createAction, props } from '@ngrx/store';
import { IGroup } from 'src/lib/storage-manager-store/interfaces/group.interface';

export const groupActions = {
  AddGroup: '[Group] Add Group',
  AddGroups: '[Groups] Add Groups',
  RouteToGroup: '[Group] Route To Group',
  SetCurrentGroup: '[Group] Set Current Group',
  SetNextGroup: '[Group] Set Next Group',
  SetSolutionGroups: '[Group] Set Solution Groups',
  UpdateGroup: '[Group] Update Group',
  UpdateGroups: '[Group] Update Groups'
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

export const updateGroup = createAction(
  groupActions.UpdateGroup,
  props<{ group: IGroup }>()
);

export const updateGroups = createAction(
  groupActions.UpdateGroups,
  props<{ groups: IGroup[] }>()
);
