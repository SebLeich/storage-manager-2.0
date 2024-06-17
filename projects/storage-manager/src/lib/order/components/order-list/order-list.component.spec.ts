
import { provideMockStore } from '@ngrx/store/testing';
import { OrderListComponent } from './order-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslationModule } from '@/lib/translation';
import { NgLetModule } from 'ng-let';
import { InputModule } from '@/lib/input/input.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FEATURE_KEY as GROUP_FEATURE_KEY, INITIAL_STATE as GROUP_INITIAL_STATE } from '@/lib/groups/store/group.reducer';
import { FEATURE_KEY as ORDER_FEATURE_KEY, INITIAL_STATE as ORDER_INITIAL_STATE } from '@/lib/order/store/order.reducer';
import { GroupSelectionComponent } from '@/lib/groups/components/group-selection/group-selection.component';
import { MockComponent } from 'ng-mocks';
import { MatTooltipModule } from '@angular/material/tooltip';


describe('OrderListComponent', () => {
    let spectator: Spectator<OrderListComponent>;

    const initialState = {
        [GROUP_FEATURE_KEY]: GROUP_INITIAL_STATE,
        [ORDER_FEATURE_KEY]: ORDER_INITIAL_STATE
    };

    const createComponent = createComponentFactory({
        component: OrderListComponent,
        declarations: [MockComponent(GroupSelectionComponent)],
        imports: [
            InputModule,
            MatIconModule,
            MatTooltipModule,
            NgLetModule,
            ReactiveFormsModule,
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
