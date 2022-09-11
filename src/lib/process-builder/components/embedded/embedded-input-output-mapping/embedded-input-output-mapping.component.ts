import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, ReplaySubject, Subscription } from 'rxjs';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { IParamDefinition } from 'src/lib/process-builder/globals/i-param-definition';
import { selectIFunction } from 'src/lib/process-builder/store/selectors/i-function.selector';
import { filter, map, switchMap } from 'rxjs/operators';
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

  public outputParamName$ = this._store
    .select(selectIFunction(() => this.formGroup.controls['functionIdentifier'].value))
    .pipe(
      filter(func => !!func),
      switchMap((func) => {
        if (typeof func!.output?.interface === 'number') {
          return this._store
            .select(selectIInterface(func!.output!.interface))
            .pipe(map(iface => iface?.name));
        }
        return of(`param ${func!.output!.param}`);
      })
    );

  private _availableTypes = new BehaviorSubject<IParamMember[]>([]);
  availableTypes$ = this._availableTypes.asObservable();

  private _params = new ReplaySubject<IParamDefinition[]>(1);
  params$ = this._params.asObservable();

  private _subscriptions: Subscription[] = [];

  constructor(private _store: Store) { }

  menuOpened() {
    this._setAvailableTypes();
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
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
