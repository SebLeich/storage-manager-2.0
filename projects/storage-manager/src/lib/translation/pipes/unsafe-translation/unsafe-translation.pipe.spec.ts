import { SpectatorPipe, createPipeFactory } from '@ngneat/spectator';
import { UnsafeTranslationPipe } from './unsafe-translation.pipe';
import { TranslationService } from '../../services/translation.service';
import { of } from 'rxjs';

describe('UnsafeTranslationPipe', () => {
    let spectator: SpectatorPipe<UnsafeTranslationPipe>;

    const createPipe = createPipeFactory<UnsafeTranslationPipe>({
        pipe: UnsafeTranslationPipe,
        providers: [
            {
                provide: TranslationService,
                useValue: {
                    afterLanguageChanged$: of(),
                    translate: () => 'translated',
                },
            },
        ],
    });

    beforeEach(() => spectator = createPipe());

    it('should create', () => {
        expect(spectator).toBeTruthy();
    });
});
