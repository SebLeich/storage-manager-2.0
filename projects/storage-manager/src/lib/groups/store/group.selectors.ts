import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Group } from "@/lib/storage-manager/types/group.type";
import { State, FEATURE_KEY } from "./group.reducer";

export const groupState = createFeatureSelector<State>(FEATURE_KEY);

export const selectGroups = createSelector(groupState, (state) => Object.values(state.entities).filter(group => group) as Group[]);