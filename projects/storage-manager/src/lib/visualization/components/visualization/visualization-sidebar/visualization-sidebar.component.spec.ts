
import { TranslationModule } from '@/lib/translation';
import { VisualizationSidebarComponent } from './visualization-sidebar.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { FEATURE_KEY, INITIAL_STATE } from '@/lib/visualization/store/visualization.reducer';
import { GoodsPreviewComponent } from '../../goods-preview/goods-preview.component';
import { NgLetModule } from 'ng-let';

describe('VisualizationSidebarComponent', () => {
    let spectator: Spectator<VisualizationSidebarComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: VisualizationSidebarComponent,
        declarations: [
            GoodsPreviewComponent
        ],
        imports: [
            NgLetModule,
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
