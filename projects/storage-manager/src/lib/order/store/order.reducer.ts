import { Order } from "@/lib/storage-manager/types/order.type";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { addOrder, removeOrder, setOrders } from "./order.actions";
import { v4 } from 'uuid';
import { removeGroup } from "@/lib/groups/store/group.actions";

export const featureKey = 'ORDERS';

export interface State extends EntityState<Order> {
    ids: string[];
}

const adapter = createEntityAdapter<Order>(
    {
        selectId: (order) => order.id,
        sortComparer: (order1, order2) => order1.index > order2.index ? 1 : -1,
    }
);

const initialState: State = adapter.getInitialState({
    selectedOrderId: null,
    entities: {},
    ids: [],
});

export const reducer = createReducer(
    initialState,
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