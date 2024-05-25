import { SolutionGroupsComponent } from './solution-groups.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('SolutionGroupsComponent', () => {
    let spectator: Spectator<SolutionGroupsComponent>;

    const createComponent = createComponentFactory({
        component: SolutionGroupsComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
