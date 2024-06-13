import { Injectable } from '@angular/core';
import { Observable, distinctUntilChanged, filter, map, startWith, switchMap } from 'rxjs';
import { NestedPropertyOf } from '../types/nested-key-of.type';
import { LoadOptions, TranslocoService } from '@jsverse/transloco';

import * as TDict from 'src/assets/i18n/en.json';

@Injectable()
export class TranslationService {
	public languageChanges$ = this._translocoService.langChanges$.pipe(startWith(this._translocoService.getActiveLang()));
	public afterLanguageChanged$ = this.languageChanges$.pipe(
		distinctUntilChanged(),
		filter((language) => language != null),
		switchMap((language) => this._translocoService.load(language))
	);

	public currentLanguageCountryISO3166$ = this.languageChanges$.pipe(
		map((language) => {
			if (language === 'en') {
				return 'us';
			}

			if (language === 'ar') {
				return 'sa';
			}

			return language;
		})
	);

	constructor(private _translocoService: TranslocoService) { }

	public getActiveLanguage() {
		return this._translocoService.getActiveLang();
	}

	public nextLanguage() {
		const languages = this.getAvailableLanguages() as string[],
			activeLanguage = this.getActiveLanguage();

		const index = languages.indexOf(activeLanguage);
		const nextLanguage = languages[index + 1] || languages[0];

		this.setActiveLanguage(nextLanguage);
	}

	public setActiveLanguage(language: string) {
		return this._translocoService.setActiveLang(language);
	}

	public load(path: string, options?: LoadOptions) {
		return this._translocoService.load(path, options);
	}

	public getAvailableLanguages(): string[] {
		const availableLanguages = this._translocoService.getAvailableLangs();
		return availableLanguages as string[];
	}

	public translate(dictionaryKey: NestedPropertyOf<typeof TDict>, params?: { [key: string]: string | number }) {
		return this._translocoService.translate(dictionaryKey, params);
	}

	public translateAsync(dictionaryKey: NestedPropertyOf<typeof TDict>, params?: { [key: string]: string | number }): Observable<string> {
		return this.afterLanguageChanged$.pipe(
			map(() => this.translate(dictionaryKey, params))
		);
	}
}
