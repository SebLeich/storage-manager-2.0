
import { TranslationModule } from '@/lib/translation';
import { VisualizationSidebarComponent } from './visualization-sidebar.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { FEATURE_KEY, INITIAL_STATE } from '@/lib/visualization/store/visualization.reducer';
import { GoodsPreviewComponent } from '../../goods-preview/goods-preview.component';
import { NgLetModule } from 'ng-let';
import { SolutionGroupsComponent } from '../../solution-groups/solution-groups.component';
import { MockComponent } from 'ng-mocks';
import { ContainerPreviewComponent } from '../../container-preview/container-preview.component';

describe('VisualizationSidebarComponent', () => {
    let spectator: Spectator<VisualizationSidebarComponent>;

    const initialState = { [FEATURE_KEY]: INITIAL_STATE };

    const createComponent = createComponentFactory({
        component: VisualizationSidebarComponent,
        declarations: [
            MockComponent(ContainerPreviewComponent),
            MockComponent(SolutionGroupsComponent),
            MockComponent(GoodsPreviewComponent),
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
