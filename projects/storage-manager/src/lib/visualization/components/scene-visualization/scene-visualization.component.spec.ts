import { SceneVisualizationComponent } from './scene-visualization.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('SceneVisualizationComponent', () => {
    let spectator: Spectator<SceneVisualizationComponent>;

    const createComponent = createComponentFactory({
        component: SceneVisualizationComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
