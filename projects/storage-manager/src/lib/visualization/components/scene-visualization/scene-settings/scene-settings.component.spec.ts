import { TranslationModule } from '@/lib/translation';
import { SceneSettingsComponent } from './scene-settings.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('SceneSettingsComponent', () => {
    let spectator: Spectator<SceneSettingsComponent>;

    const createComponent = createComponentFactory({
        component: SceneSettingsComponent,
        imports: [
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
