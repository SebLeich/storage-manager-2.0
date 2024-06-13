
import { GroupListComponent } from './group-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { featureKey } from '../../store/group.reducer';
import { provideMockStore } from '@ngrx/store/testing';

describe('GroupListComponent', () => {
    let spectator: Spectator<GroupListComponent>;

    const initialState = { [featureKey]: {} };

    const createComponent = createComponentFactory({
        component: GroupListComponent,
        providers: [
            provideMockStore({ initialState })
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
