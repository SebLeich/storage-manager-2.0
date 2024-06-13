import { MatIconModule } from '@angular/material/icon';
import { ObjectSiteSelectionComponent } from './object-site-selection.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslationModule } from '@/lib/translation';

describe('ObjectSitePreviewComponent', () => {
    let spectator: Spectator<ObjectSiteSelectionComponent>;

    const createComponent = createComponentFactory({
        component: ObjectSiteSelectionComponent,
        imports: [
            MatIconModule,
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
