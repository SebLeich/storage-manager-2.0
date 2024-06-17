
import { GroupListComponent } from './group-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/group.reducer';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslationModule } from '@/lib/translation';
import { NgLetModule } from 'ng-let';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InputModule } from '@/lib/input/input.module';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('GroupListComponent', () => {
    let spectator: Spectator<GroupListComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: GroupListComponent,
        imports: [
            InputModule,
            MatIconModule,
            MatTooltipModule,
            NgLetModule,
            ReactiveFormsModule,
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
