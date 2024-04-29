import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { isEqual } from 'lodash';
import { OrderDataGenerator } from './test/order.data-generator';
import { State } from '../reducers/order.reducers';
import { selectOrderById, selectOrders } from './order.selectors';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IOrder } from '../../interfaces/order.interface';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

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
        const sorteOrderGuids = orders.map(order => order.id).sort();
        const allOrders: IOrder[] = await selectSnapshot(store.select(selectOrders));

        expect(isEqual(allOrders.map(order => order!.id).sort(), sorteOrderGuids)).toBeTrue();
    });

    orders.forEach(order => {

        it(`should select order ${order.id} correctly`, async () => {
            const orderWithIdentifier: IOrder = await selectSnapshot(store.select(selectOrderById(order.id)));
    
            expect(orderWithIdentifier).toBeTruthy();
            expect(isEqual(orderWithIdentifier, order)).toBeTruthy();
        });

    })

});
