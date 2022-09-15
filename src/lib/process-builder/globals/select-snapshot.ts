import { endWith, firstValueFrom, Observable } from 'rxjs';

export function selectSnapshot<T>(obs: Observable<T>): Promise<T> {
    return firstValueFrom(obs.pipe(endWith({} as T)));
}