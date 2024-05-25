import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CalculationStepsComponent } from './calculation-steps.component';

describe('CalculationStepsComponent', () => {
    let spectator: Spectator<CalculationStepsComponent>;

    const createComponent = createComponentFactory({
        component: CalculationStepsComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
