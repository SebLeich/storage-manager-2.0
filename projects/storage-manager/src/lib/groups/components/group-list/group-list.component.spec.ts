
import { GroupListComponent } from './group-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/group.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslationModule } from '@/lib/translation';

describe('GroupListComponent', () => {
    let spectator: Spectator<GroupListComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: GroupListComponent,
        imports: [
            TranslationModule
        ],
        providers: [
            provideMockStore({ initialState })
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
