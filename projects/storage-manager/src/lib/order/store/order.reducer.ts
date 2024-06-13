import { Order } from "@/lib/storage-manager/types/order.type";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { addOrder, removeOrder, setOrders } from "./order.actions";
import { v4 } from 'uuid';
import { removeGroup } from "@/lib/groups/store/group.actions";

export const FEATURE_KEY = 'ORDERS';

export interface State extends EntityState<Order> {
    ids: string[];
}

const adapter = createEntityAdapter<Order>(
    {
        selectId: (order) => order.id,
        sortComparer: (order1, order2) => order1.index > order2.index ? 1 : -1,
    }
);

export const INITIAL_STATE: State = adapter.getInitialState({
    selectedOrderId: null,
    entities: {
        '1': { id: '1', index: 0, description: 'Order', group: '1', quantity: 5, width: 400, height: 150, length: 350, stackingAllowed: true, turningAllowed: true, texture: 'cardboard' }
    },
    ids: ['1'],
});

export const reducer = createReducer(
    INITIAL_STATE,
    on(addOrder, (state, { order }) => {
        const id = order.id ?? v4(),
            index = order.index ?? Math.max(...state.ids.map(id => state.entities[id]?.index ?? 0), 0) + 1;

        return adapter.addOne({ ...order, id, index }, state);
    }),
    on(removeGroup, (state, { group }) => {
        const orderIds = state.ids.filter(id => state.entities[id]?.group === group.id);

        return adapter
            .updateMany(orderIds.map((id) => {
                return {
                    id,
                    changes: {
                        group: ''
                    }
                };
            }),
                state
            );
    }),
    on(removeOrder, (state, { order }) => {
        return adapter.removeOne(order.id, state);
    }),
    on(setOrders, (state, { orders }) => {
        return adapter.setAll(orders, state);
    })
);