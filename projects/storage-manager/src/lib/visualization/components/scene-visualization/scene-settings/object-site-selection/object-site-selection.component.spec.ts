import { MatIconModule } from '@angular/material/icon';
import { ObjectSiteSelectionComponent } from './object-site-selection.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslationModule } from '@/lib/translation';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ObjectSitePreviewComponent', () => {
    let spectator: Spectator<ObjectSiteSelectionComponent>;

    const createComponent = createComponentFactory({
        component: ObjectSiteSelectionComponent,
        imports: [
            MatIconModule,
            MatTooltipModule,
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
