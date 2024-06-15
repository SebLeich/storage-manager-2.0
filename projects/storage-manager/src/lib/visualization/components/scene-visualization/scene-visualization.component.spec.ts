import { provideMockStore } from '@ngrx/store/testing';
import { SceneVisualizationComponent } from './scene-visualization.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/visualization.reducer';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SceneSettingsComponent } from './scene-settings/scene-settings.component';
import { TranslationModule } from '@/lib/translation';

describe('SceneVisualizationComponent', () => {
    let spectator: Spectator<SceneVisualizationComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: SceneVisualizationComponent,
        declarations: [SceneSettingsComponent],
        imports: [
            DragDropModule,
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
