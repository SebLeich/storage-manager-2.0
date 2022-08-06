import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of, ReplaySubject, Subscription } from 'rxjs';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { IParamDefinition } from 'src/lib/process-builder/globals/i-param-definition';
import * as fromIParam from 'src/lib/process-builder/store/reducers/i-param.reducer';
import * as fromIFunction from 'src/lib/process-builder/store/reducers/i-function.reducer';
import * as fromIInterface from 'src/lib/process-builder/store/reducers/i-interface.reducer';
import { selectIFunction } from 'src/lib/process-builder/store/selectors/i-function.selector';
import { map, switchMap } from 'rxjs/operators';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import { selectIInterface } from 'src/lib/process-builder/store/selectors/i-interface.selectors';
import { selectIParamsByType } from 'src/lib/process-builder/store/selectors/i-param.selectors';
import { IInterface } from 'src/lib/process-builder/globals/i-interface';
import { IParamMember } from 'src/lib/process-builder/globals/i-param-member';
import { IParam } from 'src/lib/process-builder/globals/i-param';

@Component({
  selector: '[app-embedded-input-output-mapping]',
  templateUrl: './embedded-input-output-mapping.component.html',
  styleUrls: ['./embedded-input-output-mapping.component.sass'],
})
export class EmbeddedInputOutputMappingComponent
  implements IEmbeddedView, OnDestroy, OnInit
{
  @Input() inputParams!: number | number[] | null;

  formGroup!: FormGroup;

  outputParamName$ = this._funcStore
    .select(
      selectIFunction(() => this.formGroup.controls['functionIdentifier'].value)
    )
    .pipe(
      switchMap((func: IFunction) => {
        if (typeof func.output?.interface === 'number') {
          return this._interfaceStore
            .select(selectIInterface(func.output!.interface))
            .pipe(map((x) => x.name));
        }
        return of(`param ${func.output.param}`);
      })
    );

  private _currentDefinition = new ReplaySubject<{
    type: 'object' | 'number' | 'string' | 'boolean' | 'array';
    interface?: IInterface;
  }>(1);
  availableTypes$: Observable<IParamMember[]> = this._currentDefinition.pipe(
    switchMap((def) => {
      return this._paramStore.select(selectIParamsByType(def));
    }),
    map((iParams: IParam[]) => iParams.map(iParam => {
      return {
        navigationPath: 'test',
        type: iParam.type
      }
    }))
  );

  private _params = new ReplaySubject<IParamDefinition[]>(1);
  params$ = this._params.asObservable();

  private _subscription: Subscription = new Subscription();

  constructor(
    private _paramStore: Store<fromIParam.State>,
    private _funcStore: Store<fromIFunction.State>,
    private _interfaceStore: Store<fromIInterface.State>
  ) {}

  ngOnDestroy = () => this._subscription.unsubscribe();

  ngOnInit(): void {
    this._subscription.add(
      ...[
        this.outputParamValueControl.valueChanges.subscribe(
          (val: IParamDefinition | IParamDefinition[] | null | undefined) => {
            this._params.next(val ? (Array.isArray(val) ? val : [val]) : []);
          }
        ),
      ]
    );
    this._params.next(
      this.outputParamValueControl.value
        ? Array.isArray(this.outputParamValueControl.value)
          ? this.outputParamValueControl.value
          : [this.outputParamValueControl.value]
        : []
    );
  }

  updateAvailableParams(type, iface?) {
    this._currentDefinition.next({ type: type, interface: iface });
  }

  get outputParamValueControl(): FormControl {
    return this.formGroup.controls['outputParamValue'] as FormControl;
  }
}
