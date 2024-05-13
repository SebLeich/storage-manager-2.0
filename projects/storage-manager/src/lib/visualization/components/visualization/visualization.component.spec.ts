
import { VisualizationComponent } from './visualization.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('VisualizationComponent', () => {
    let spectator: Spectator<VisualizationComponent>;

    const createComponent = createComponentFactory({
        component: VisualizationComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
