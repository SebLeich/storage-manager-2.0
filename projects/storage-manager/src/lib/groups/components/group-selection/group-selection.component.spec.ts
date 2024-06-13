
import { provideMockStore } from '@ngrx/store/testing';
import { GroupSelectionComponent } from './group-selection.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { featureKey } from '../../store/group.reducer';
import { TranslationModule } from '@/lib/translation';
import { InputModule } from '@/lib/input/input.module';

describe('GroupSelectionComponent', () => {
    let spectator: Spectator<GroupSelectionComponent>;

    const initialState = { [featureKey]: {} };

    const createComponent = createComponentFactory({
        component: GroupSelectionComponent,
        imports: [
            InputModule,
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
