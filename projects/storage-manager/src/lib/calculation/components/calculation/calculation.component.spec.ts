
import { provideMockStore } from '@ngrx/store/testing';
import { CalculationComponent } from './calculation.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/calculation.reducer';
import { GroupListComponent } from '@/lib/groups/components/group-list/group-list.component';
import { OrderListComponent } from '@/lib/order/components/order-list/order-list.component';

describe('CalculationComponent', () => {
    let spectator: Spectator<CalculationComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: CalculationComponent,
        declarations: [GroupListComponent, OrderListComponent],
        providers: [
            provideMockStore({ initialState })
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
