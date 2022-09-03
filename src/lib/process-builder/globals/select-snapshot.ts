import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export function selectSnapshot<T>(obs: Observable<T>): Promise<T> {
    return obs.pipe(take(1)).toPromise();
}