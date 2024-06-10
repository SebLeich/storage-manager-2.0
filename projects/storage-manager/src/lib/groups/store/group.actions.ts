import { Group } from "@/lib/storage-manager/types/group.type";
import { createAction, props } from "@ngrx/store";

export const addGroup = createAction(
    '[Group] Add',
    props<{ group: Group }>()
);

export const removeGroup = createAction(
    '[Group] Remove',
    props<{ group: Group }>()
);

export const setGroups = createAction(
    '[Group] Set',
    props<{ groups: Group[] }>()
);