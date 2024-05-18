
import { VisualizationSidebarComponent } from './visualization-sidebar.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('VisualizationSidebarComponent', () => {
    let spectator: Spectator<VisualizationSidebarComponent>;

    const createComponent = createComponentFactory({
        component: VisualizationSidebarComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
