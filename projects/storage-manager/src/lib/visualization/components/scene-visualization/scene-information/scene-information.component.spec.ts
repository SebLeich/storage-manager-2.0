import { TranslationModule } from '@/lib/translation';
import { SceneInformationComponent } from './scene-information.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { NgLetModule } from 'ng-let';
import { ObjectSiteSelectionComponent } from '../scene-settings/object-site-selection/object-site-selection.component';

describe('SceneInformationComponent', () => {
    let spectator: Spectator<SceneInformationComponent>;

    const createComponent = createComponentFactory({
        component: SceneInformationComponent,
        declarations: [ObjectSiteSelectionComponent],
        imports: [
            NgLetModule,
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
