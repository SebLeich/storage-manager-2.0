import { TranslationModule } from '@/lib/translation';
import { SolutionValidationComponent } from './solution-validation.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('SolutionValidationComponent', () => {
    let spectator: Spectator<SolutionValidationComponent>;

    const createComponent = createComponentFactory({
        component: SolutionValidationComponent,
        imports: [TranslationModule]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
