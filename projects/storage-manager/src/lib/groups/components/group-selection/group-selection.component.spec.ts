
import { provideMockStore } from '@ngrx/store/testing';
import { GroupSelectionComponent } from './group-selection.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/group.reducer';
import { TranslationModule } from '@/lib/translation';
import { InputModule } from '@/lib/input/input.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('GroupSelectionComponent', () => {
    let spectator: Spectator<GroupSelectionComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: GroupSelectionComponent,
        imports: [
            InputModule,
            ReactiveFormsModule,
            TranslationModule,
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
