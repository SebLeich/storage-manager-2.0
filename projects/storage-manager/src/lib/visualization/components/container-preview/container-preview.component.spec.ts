import { ContainerPreviewComponent } from './container-preview.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslationModule } from '@/lib/translation';

describe('ContainerPreviewComponent', () => {
    let spectator: Spectator<ContainerPreviewComponent>;
    const createComponent = createComponentFactory({
        component: ContainerPreviewComponent,
        imports: [
            TranslationModule
        ],
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
