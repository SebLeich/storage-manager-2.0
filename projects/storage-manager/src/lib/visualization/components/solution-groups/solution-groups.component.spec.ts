import { TranslationModule } from '@/lib/translation';
import { SolutionGroupsComponent } from './solution-groups.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('SolutionGroupsComponent', () => {
    let spectator: Spectator<SolutionGroupsComponent>;

    const createComponent = createComponentFactory({
        component: SolutionGroupsComponent,
        imports: [
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
