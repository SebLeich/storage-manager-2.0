import { VisualizationFooterComponent } from './visualization-footer.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('VisualizationFooterComponent', () => {
    let spectator: Spectator<VisualizationFooterComponent>;

    const createComponent = createComponentFactory({
        component: VisualizationFooterComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
