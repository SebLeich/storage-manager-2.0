import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LanguageLoader implements TranslocoLoader {
    constructor(private _httpClient: HttpClient) { }

    public getTranslation(language: string): Observable<Translation> {
        return this._httpClient
            .get<Translation>(`./assets/i18n/${language}.json`);
    }
}
