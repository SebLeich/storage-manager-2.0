
import { provideMockStore } from '@ngrx/store/testing';
import { CalculationComponent } from './calculation.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/calculation.reducer';
import { GroupListComponent } from '@/lib/groups/components/group-list/group-list.component';
import { OrderListComponent } from '@/lib/order/components/order-list/order-list.component';
import { CalculationSidebarComponent } from './calculation-sidebar/calculation-sidebar.component';
import { FEATURE_KEY as ORDER_FEATURE_KEY, INITIAL_STATE as ORDER_INITIAL_STATE } from '@/lib/order/store/order.reducer';
import { FEATURE_KEY as GROUP_FEATURE_KEY, INITIAL_STATE as GROUP_INITIAL_STATE } from '@/lib/groups/store/group.reducer';
import { ScaffoldModule } from '@/lib/scaffold/scaffold.module';

describe('CalculationComponent', () => {
    let spectator: Spectator<CalculationComponent>;

    const initialState = {
        [FEATURE_KEY]: INITIAL_STATE,
        [GROUP_FEATURE_KEY]: GROUP_INITIAL_STATE,
        [ORDER_FEATURE_KEY]: ORDER_INITIAL_STATE
    };

    const createComponent = createComponentFactory({
        component: CalculationComponent,
        declarations: [CalculationSidebarComponent, GroupListComponent, OrderListComponent],
        imports: [ScaffoldModule],
        providers: [
            provideMockStore({ initialState })
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
