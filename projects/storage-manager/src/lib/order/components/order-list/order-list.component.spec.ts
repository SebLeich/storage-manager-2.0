
import { provideMockStore } from '@ngrx/store/testing';
import { OrderListComponent } from './order-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/order.reducer';
import { TranslationModule } from '@/lib/translation';
import { NgLetModule } from 'ng-let';
import { InputModule } from '@/lib/input/input.module';

describe('OrderListComponent', () => {
    let spectator: Spectator<OrderListComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: OrderListComponent,
        imports: [
            InputModule,
            NgLetModule,
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
