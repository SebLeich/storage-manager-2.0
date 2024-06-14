
import { TranslationModule } from '@/lib/translation';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { ContainerPreviewComponent } from '../container-preview/container-preview.component';

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
