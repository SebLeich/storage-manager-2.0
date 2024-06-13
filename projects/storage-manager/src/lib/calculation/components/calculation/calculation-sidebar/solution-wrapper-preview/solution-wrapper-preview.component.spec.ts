
import { TranslationModule } from '@/lib/translation';
import { SolutionWrapperPreviewComponent } from './solution-wrapper-preview.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { PrettyLengthPipe } from '@/lib/shared/pipes/pretty-length/pretty-length.pipe';

describe('SolutionWrapperPreviewComponent', () => {
    let spectator: Spectator<SolutionWrapperPreviewComponent>;

    const createComponent = createComponentFactory({
        component: SolutionWrapperPreviewComponent,
        declarations: [
            PrettyLengthPipe
        ],
        imports: [
            TranslationModule
        ],
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
