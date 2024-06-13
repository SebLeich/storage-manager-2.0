import { Group } from "@/lib/storage-manager/types/group.type";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { v4 } from 'uuid';
import { addGroup, removeGroup, setGroups } from "./group.actions";

export const FEATURE_KEY = 'GROUPS';

export interface State extends EntityState<Group> {
    ids: string[];
}

const adapter = createEntityAdapter<Group>(
    {
        selectId: (group) => group.id,
        sortComparer: (group1, group2) => group1.sequenceNumber > group2.sequenceNumber ? 1 : -1,
    }
);

export const INITIAL_STATE: State = adapter.getInitialState({
    selectedOrderId: null,
    entities: {
        '1': { color: '#6d2da8', desc: 'test 1', id: '1', sequenceNumber: 0 },
        '2': { color: '#6d6da8', desc: 'test 2', id: '2', sequenceNumber: 1 }
    },
    ids: ['1', '2'],
});

export const reducer = createReducer(
    INITIAL_STATE,
    on(addGroup, (state, { group }) => {
        const id = group.id ?? v4(),
            sequenceNumber = group.sequenceNumber ?? Math.max(...state.ids.map(id => state.entities[id]?.sequenceNumber ?? 0), 0) + 1;

        return adapter.addOne({ ...group, id, sequenceNumber }, state);
    }),
    on(removeGroup, (state, { group }) => {
        return adapter.removeOne(group.id, state);
    }),
    on(setGroups, (state, { groups }) => {
        return adapter.setAll(groups, state);
    })
);