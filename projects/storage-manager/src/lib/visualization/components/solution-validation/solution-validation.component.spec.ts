import { SolutionValidationComponent } from './solution-validation.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('SolutionValidationComponent', () => {
    let spectator: Spectator<SolutionValidationComponent>;

    const createComponent = createComponentFactory({
        component: SolutionValidationComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
