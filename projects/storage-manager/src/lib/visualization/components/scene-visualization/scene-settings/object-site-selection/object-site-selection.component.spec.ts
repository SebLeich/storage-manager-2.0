import { ObjectSiteSelectionComponent } from './object-site-selection.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('ObjectSitePreviewComponent', () => {
    let spectator: Spectator<ObjectSiteSelectionComponent>;

    const createComponent = createComponentFactory({
        component: ObjectSiteSelectionComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
