import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { IFunction } from '@process-builder/interfaces';
import { forkJoin, map, of, ReplaySubject, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIInterface, selectIParam } from '@process-builder/selectors';

@Component({
  selector: 'app-function-preview',
  templateUrl: './function-preview.component.html',
  styleUrls: ['./function-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionPreviewComponent implements OnChanges, OnDestroy {

  @Input() public func: IFunction | undefined;
  private _currentFunc$$ = new ReplaySubject<IFunction | undefined>(1);

  public inputs$ = this._currentFunc$$.pipe(
    switchMap(func => {
      let inputParams = func?.inputTemplates ?? [];
      if (!Array.isArray(inputParams)) {
        inputParams = [inputParams];
      }

      return forkJoin(inputParams.map(inputParam => inputParam === 'dynamic' ? of(inputParam) : this._store.select(selectIInterface(inputParam.interface))));
    }),
    map(inputs => inputs.map(input => typeof input === 'string' ? input : input?.name))
  );

  public output$ = this._currentFunc$$.pipe(
    switchMap(func => {
      const useInterface = typeof func?.outputTemplate === 'string';
      if (useInterface) {
        return func.outputTemplate === 'dynamic' ? of('dynamic') : this._store.select(selectIInterface(func.outputTemplate));
      }

      return this._store.select(selectIParam(func?.output));
    }),
    map(output => typeof output === 'string' ? output : output?.name)
  );

  constructor(private _store: Store) { }

  public ngOnDestroy(): void {
    this._currentFunc$$.complete();
  }

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['func']) {
      this._currentFunc$$.next(simpleChanges['func'].currentValue);
    }
  }

  public customImplementationRequiredText = 'JS code required';

}
