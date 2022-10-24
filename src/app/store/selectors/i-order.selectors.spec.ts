import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { IProcedure } from '../../interfaces/i-procedure.interface';
import defaultImportsConstant from '../../default-imports.constant';
import { announceProcedures } from '../actions/i-pending-procedure.actions';
import { selectAllProcedures, selectGlobalProcedureProgress, selectHasDeterminingProcedures, selectHasPendingProcedures, selectMostRecentlyFinishedProcedure, selectPendingProcedures } from './i-pending-procedure.selectors';
import { selectSnapshot } from "../../../lib/process-builder/globals/select-snapshot";

import { Store } from '@ngrx/store';

import * as moment from 'moment';
import { isEqual } from 'lodash';
import { IOrder } from 'src/app/interfaces/i-order.interface';
import { OrderDataGenerator } from './test/order.data-generator';
import { State } from '../reducers/i-order.reducers';
import { selectOrderById, selectOrders } from './i-order.selectors';

describe('IOrder Selectors', () => {

    let store: MockStore;

    const orders: IOrder[] = new OrderDataGenerator().generateOrders(10);
    const orderMap: { [key: string]: IOrder } = {};
    orders.forEach(order => orderMap[order.id] = order);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...defaultImportsConstant
            ],
            providers: [
                provideMockStore({
                    initialState: {
                        order: {
                            entities: orderMap,
                            ids: orders.map(order => order.id),
                            selectedOrderId: null
                        } as State
                    }
                }),
            ]
        });

        store = TestBed.inject(MockStore);
    });

    it('should select all orders', async () => {
        const sortedProcedureGuids = orders.map(order => order.id).sort();
        const allOrders: IOrder[] = await selectSnapshot(store.select(selectOrders));

        expect(isEqual(allOrders.map(order => order!.id).sort(), sortedProcedureGuids)).toBeTrue();
    });

    orders.forEach(order => {

        it(`should select order ${order.id} correctly`, async () => {
            const orderWithIdentifier: IOrder = await selectSnapshot(store.select(selectOrderById(order.id)));
    
            expect(orderWithIdentifier).toBeTruthy();
            expect(isEqual(orderWithIdentifier, order)).toBeTruthy();
        });

    })

});
