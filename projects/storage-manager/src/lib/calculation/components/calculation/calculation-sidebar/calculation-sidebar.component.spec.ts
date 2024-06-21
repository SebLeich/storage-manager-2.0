
import { CalculationSidebarComponent } from './calculation-sidebar.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '@/lib/calculation/store/calculation.reducer';
import { FEATURE_KEY as GROUP_FEATURE_KEY, INITIAL_STATE as GROUP_INITIAL_STATE } from '@/lib/groups/store/group.reducer';
import { FEATURE_KEY as ORDER_FEATURE_KEY, INITIAL_STATE as ORDER_INITIAL_STATE } from '@/lib/order/store/order.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslationModule } from '@/lib/translation';
import { NgLetModule } from 'ng-let';
import { InputModule } from '@/lib/input/input.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

describe('CalculationSidebarComponent', () => {
    let spectator: Spectator<CalculationSidebarComponent>;

    const initialState = {
        [FEATURE_KEY]: INITIAL_STATE,
        [GROUP_FEATURE_KEY]: GROUP_INITIAL_STATE,
        [ORDER_FEATURE_KEY]: ORDER_INITIAL_STATE
    };

    const createComponent = createComponentFactory({
        component: CalculationSidebarComponent,
        imports: [
            InputModule,
            MatMenuModule,
            MatProgressSpinnerModule,
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
