import { SpectatorPipe, createPipeFactory } from "@ngneat/spectator";
import { TranslationService } from "../../services/translation.service";
import { TranslationPipe } from "./translation.pipe";
import { of } from "rxjs";

describe('TranslationPipe', () => {
    let spectator: SpectatorPipe<TranslationPipe>;

    const createPipe = createPipeFactory<TranslationPipe>({
        pipe: TranslationPipe,
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