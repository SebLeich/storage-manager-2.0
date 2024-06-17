import { TranslationModule } from '@/lib/translation';
import { SceneSettingsComponent } from './scene-settings.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { InputModule } from '@/lib/input/input.module';
import { MockComponent } from 'ng-mocks';
import { ObjectSiteSelectionComponent } from './object-site-selection/object-site-selection.component';
import { MatIconModule } from '@angular/material/icon';

describe('SceneSettingsComponent', () => {
    let spectator: Spectator<SceneSettingsComponent>;

    const createComponent = createComponentFactory({
        component: SceneSettingsComponent,
        declarations: [MockComponent(ObjectSiteSelectionComponent)],
        imports: [
            InputModule,
            MatIconModule,
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
