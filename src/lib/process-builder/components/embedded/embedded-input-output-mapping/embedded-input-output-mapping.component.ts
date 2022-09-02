import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, ReplaySubject, Subscription } from 'rxjs';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { IParamDefinition } from 'src/lib/process-builder/globals/i-param-definition';
import * as fromIParam from 'src/lib/process-builder/store/reducers/i-param.reducer';
import * as fromIFunction from 'src/lib/process-builder/store/reducers/i-function.reducer';
import { selectIFunction } from 'src/lib/process-builder/store/selectors/i-function.selector';
import { map, switchMap } from 'rxjs/operators';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import { selectIInterface } from 'src/lib/process-builder/store/selectors/i-interface.selectors';
import { IParamMember } from 'src/lib/process-builder/globals/i-param-member';

@Component({
  selector: '[app-embedded-input-output-mapping]',
  templateUrl: './embedded-input-output-mapping.component.html',
  styleUrls: ['./embedded-input-output-mapping.component.sass']
})
export class EmbeddedInputOutputMappingComponent implements IEmbeddedView, OnDestroy, OnInit {

  @Input() inputParams!: number | number[] | null;

  formGroup!: UntypedFormGroup;

  outputParamName$ = this._funcStore
    .select(selectIFunction(() => this.formGroup.controls['functionIdentifier'].value))
    .pipe(
      switchMap((func: IFunction) => {
        if (typeof func.output?.interface === 'number') {
          return this._interfaceStore
            .select(selectIInterface(func.output!.interface))
            .pipe(map(x => x.name));
        }
        return of(`param ${func.output.param}`);
      })
    );

  private _availableTypes = new BehaviorSubject<IParamMember[]>([]);
  availableTypes$ = this._availableTypes.asObservable();

  private _params = new ReplaySubject<IParamDefinition[]>(1);
  params$ = this._params.asObservable();

  private _subscriptions: Subscription[] = [];

  constructor(
    private _paramStore: Store<fromIParam.State>,
    private _funcStore: Store<fromIFunction.State>,
    private _interfaceStore: Store<fromIFunction.State>
  ) { }

  menuOpened() {
    this._setAvailableTypes();
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
    console.log(this.formGroup.value, this.inputParams);
    this._subscriptions.push(...[
      this.outputParamValueControl.valueChanges.subscribe((val: IParamDefinition | IParamDefinition[] | null | undefined) => {
        this._params.next(val ? Array.isArray(val) ? val : [val] : []);
      })
    ]);
    this._params.next(this.outputParamValueControl.value ? Array.isArray(this.outputParamValueControl.value) ? this.outputParamValueControl.value : [this.outputParamValueControl.value] : []);
  }

  private _setAvailableTypes() {
    this._availableTypes.next([
      { navigationPath: 'exemplarySolution', type: 'solution (template)' },
      { navigationPath: 'exemplarySolution.container', type: 'container (template)' }
    ])
  }

  get outputParamValueControl(): UntypedFormControl {
    return this.formGroup.controls['outputParamValue'] as UntypedFormControl;
  }

}
