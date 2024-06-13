
import { provideMockStore } from '@ngrx/store/testing';
import { VisualizationComponent } from './visualization.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FEATURE_KEY, INITIAL_STATE } from '../../store/visualization.reducer';
import { DownloadModule } from '@/lib/download/download.module';
import { RouterModule } from '@angular/router';

describe('VisualizationComponent', () => {
    let spectator: Spectator<VisualizationComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: VisualizationComponent,
        imports: [
            DownloadModule,
            RouterModule.forRoot([ { path: '**', component: VisualizationComponent } ]),
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
