
import { CalculationComponent } from './calculation.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('CalculationComponent', () => {
    let spectator: Spectator<CalculationComponent>;

    const createComponent = createComponentFactory({
        component: CalculationComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
