import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, ReplaySubject, Subscription } from 'rxjs';
import { EmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IParamDefinition } from 'src/lib/process-builder/globals/i-param-definition';
import { selectIFunction } from 'src/lib/process-builder/store/selectors/function.selector';
import { filter, map, switchMap } from 'rxjs/operators';
import { selectIInterface } from 'src/lib/process-builder/store/selectors/interface.selectors';
import { IParamMember } from 'src/lib/process-builder/globals/i-param-member';
import { ITaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation.interface';

@Component({
  selector: '[app-embedded-input-output-mapping]',
  templateUrl: './embedded-input-output-mapping.component.html',
  styleUrls: ['./embedded-input-output-mapping.component.scss']
})
export class EmbeddedInputOutputMappingComponent implements EmbeddedView, OnDestroy, OnInit {

  @Input() public inputParams!: number | number[] | null;

  public formGroup = new FormGroup({
    'functionIdentifier': new FormControl(null),
    'outputParamValue': new FormControl(null)
  }) as FormGroup<Partial<ITaskCreationFormGroup>>;

  public outputParamName$ = this._store
    .select(selectIFunction(() => this.formGroup.controls['functionIdentifier']!.value))
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
  public availableTypes$ = this._availableTypes.asObservable();

  private _params = new ReplaySubject<IParamDefinition[]>(1);
  public params$ = this._params.asObservable();

  private _subscriptions: Subscription = new Subscription();

  constructor(private _store: Store) { }

  public menuOpened() {
    this._setAvailableTypes();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    this._subscriptions.add(...[
      this.formGroup.controls.outputParamValue!
        .valueChanges
        .subscribe((val: IParamDefinition | IParamDefinition[] | null | undefined) => {
          this._params.next(val ? Array.isArray(val) ? val : [val] : []);
        })
    ]);
    this._params.next(this.formGroup.controls.outputParamValue!.value ? Array.isArray(this.formGroup.controls.outputParamValue!.value) ? this.formGroup.controls.outputParamValue!.value : [this.formGroup.controls.outputParamValue!.value] : []);
  }

  private _setAvailableTypes() {
    this._availableTypes.next([
      { navigationPath: 'exemplarySolution', type: 'solution (template)' },
      { navigationPath: 'exemplarySolution.container', type: 'container (template)' }
    ])
  }

}
