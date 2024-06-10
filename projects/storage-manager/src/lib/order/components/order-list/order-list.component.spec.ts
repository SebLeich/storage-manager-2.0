
import { OrderListComponent } from './order-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('OrderListComponent', () => {
    let spectator: Spectator<OrderListComponent>;

    const createComponent = createComponentFactory({
        component: OrderListComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
