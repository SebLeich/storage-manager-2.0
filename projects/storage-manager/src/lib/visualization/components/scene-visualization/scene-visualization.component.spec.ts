import { provideMockStore } from '@ngrx/store/testing';
import { SceneVisualizationComponent } from './scene-visualization.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/visualization.reducer';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('SceneVisualizationComponent', () => {
    let spectator: Spectator<SceneVisualizationComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: SceneVisualizationComponent,
        imports: [
            DragDropModule
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
