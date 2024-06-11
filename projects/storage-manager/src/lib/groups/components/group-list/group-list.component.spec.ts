
import { GroupListComponent } from './group-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('GroupListComponent', () => {
    let spectator: Spectator<GroupListComponent>;

    const createComponent = createComponentFactory({
        component: GroupListComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
