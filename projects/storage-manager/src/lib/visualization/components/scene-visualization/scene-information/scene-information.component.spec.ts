import { TranslationModule } from '@/lib/translation';
import { SceneInformationComponent } from './scene-information.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('SceneInformationComponent', () => {
    let spectator: Spectator<SceneInformationComponent>;

    const createComponent = createComponentFactory({
        component: SceneInformationComponent,
        imports: [
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
