
import { GroupSelectionComponent } from './group-selection.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('GroupSelectionComponent', () => {
    let spectator: Spectator<GroupSelectionComponent>;

    const createComponent = createComponentFactory({
        component: GroupSelectionComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
