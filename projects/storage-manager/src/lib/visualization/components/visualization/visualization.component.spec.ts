
import { provideMockStore } from '@ngrx/store/testing';
import { VisualizationComponent } from './visualization.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/visualization.reducer';
import { DownloadModule } from '@/lib/download/download.module';
import { RouterModule } from '@angular/router';
import { ScaffoldModule } from '@/lib/scaffold/scaffold.module';
import { MockComponent } from 'ng-mocks';
import { VisualizationFooterComponent } from './visualization-footer/visualization-footer.component';
import { SceneVisualizationComponent } from '../scene-visualization/scene-visualization.component';
import { VisualizationSidebarComponent } from './visualization-sidebar/visualization-sidebar.component';

describe('VisualizationComponent', () => {
    let spectator: Spectator<VisualizationComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: VisualizationComponent,
        declarations: [
            MockComponent(VisualizationFooterComponent),
            MockComponent(VisualizationSidebarComponent),
            MockComponent(SceneVisualizationComponent)
        ],
        imports: [
            DownloadModule,
            RouterModule.forRoot([ { path: '**', component: VisualizationComponent } ]),
            ScaffoldModule
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
