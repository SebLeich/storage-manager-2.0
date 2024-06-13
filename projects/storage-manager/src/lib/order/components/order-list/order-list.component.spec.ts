
import { provideMockStore } from '@ngrx/store/testing';
import { OrderListComponent } from './order-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/order.reducer';
import { TranslationModule } from '@/lib/translation';

describe('OrderListComponent', () => {
    let spectator: Spectator<OrderListComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: OrderListComponent,
        imports: [
            TranslationModule
        ],
        providers: [
            provideMockStore({ initialState })
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
