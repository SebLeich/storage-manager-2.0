
import { provideMockStore } from '@ngrx/store/testing';
import { CalculationComponent } from './calculation.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/calculation.reducer';

describe('CalculationComponent', () => {
    let spectator: Spectator<CalculationComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: CalculationComponent,
        providers: [
            provideMockStore({ initialState })
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
