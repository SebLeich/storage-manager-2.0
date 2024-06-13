import { Pipe } from '@angular/core';
import { TranslationPipe } from '../translation/translation.pipe';
import { Observable } from 'rxjs';

@Pipe({
    name: 'unsafeTranslation'
})
export class UnsafeTranslationPipe extends TranslationPipe {
    public override transform(value: string, args?: any): Observable<string> {
        return super.transform(value as any, args);
    }
}
