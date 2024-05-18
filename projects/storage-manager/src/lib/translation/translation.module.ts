import { NgModule, isDevMode } from '@angular/core';
import { TranslationPipe } from './pipes/translation/translation.pipe';
import { TranslationService } from './services/translation.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { UnsafeTranslationPipe } from './pipes/unsafe-translation/unsafe-translation.pipe';
import { TranslocoModule, provideTransloco } from '@jsverse/transloco';
import { GetLangParams, cookiesStorage, provideTranslocoPersistLang } from '@jsverse/transloco-persist-lang';
import { LanguageLoader } from './language-loader';

export function getPreviouslySelectedLanguage({ cachedLang, browserLang, defaultLang }: GetLangParams): string {
    return cachedLang && cachedLang != 'null' ? cachedLang : browserLang ? browserLang : defaultLang;
}

@NgModule({
    declarations: [TranslationPipe, UnsafeTranslationPipe],
    exports: [TranslocoModule, TranslationPipe, UnsafeTranslationPipe],
    imports: [HttpClientModule, TranslocoModule],
    providers: [
        TranslationService,
        provideHttpClient(),
        provideTransloco({
            config: {
                availableLangs: ['de', 'en', 'es'],
                defaultLang: 'de',
                prodMode: !isDevMode(),
            },
            loader: LanguageLoader
        }),
        provideTranslocoPersistLang({
            getLangFn: getPreviouslySelectedLanguage,
            storage: {
                useValue: cookiesStorage()
            }
        })
    ],
})
export class TranslationModule { }
