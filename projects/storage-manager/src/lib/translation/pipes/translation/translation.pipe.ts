import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TranslationService } from '../../services/translation.service';
import { NestedPropertyOf } from '../../types/nested-key-of.type';

import * as DICT from 'src/assets/i18n/en.json';

@Pipe({
	name: 'translation',
})
export class TranslationPipe implements PipeTransform {
	constructor(private _translationService: TranslationService<typeof DICT>) { }

	public transform(dictionaryKey: NestedPropertyOf<typeof DICT>, params?: { [key: string]: string }): Observable<string> {
		return this._translationService
			.afterLanguageChanged$
			.pipe(
				map(() => this._translationService.translate(dictionaryKey, params))
			);
	}
}
