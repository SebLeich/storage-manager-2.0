import { Order } from "@/lib/storage-manager/types/order.type";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { addOrder, removeOrder, setOrders } from "./order.actions";
import { v4 } from 'uuid';

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
    entities: {
        '1': { id: '1', index: 0, description: 'test 1', quantity: 10, group: '1', height: 10, width: 10, length: 10, turningAllowed: true, stackingAllowed: true },
        '2': { id: '2', index: 1, description: 'test 2', quantity: 20, group: '2', height: 20, width: 20, length: 20, turningAllowed: false, stackingAllowed: false }
    },
    ids: ['1', '2'],
});

export const reducer = createReducer(
    initialState,
    on(addOrder, (state, { order }) => {
        const id = order.id ?? v4(),
            index = order.index ?? Math.max(...state.ids.map(id => state.entities[id]?.index ?? 0), 0) + 1;

        return adapter.addOne({ ...order, id, index }, state);
    }),
    on(removeOrder, (state, { order }) => {
        return adapter.removeOne(order.id, state);
    }),
    on(setOrders, (state, { orders }) => {
        return adapter.setAll(orders, state);
    })
);