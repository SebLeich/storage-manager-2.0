
import { CalculationFooterComponent } from './calculation-footer.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('CalculationFooterComponent', () => {
    let spectator: Spectator<CalculationFooterComponent>;

    const createComponent = createComponentFactory({
        component: CalculationFooterComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
