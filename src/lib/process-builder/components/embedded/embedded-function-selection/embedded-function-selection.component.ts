import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { ParamCodes } from 'src/config/param-codes';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import { showAnimation } from 'src/lib/shared/animations/show';
import { Store } from '@ngrx/store';
import { selectIFunctions } from 'src/lib/process-builder/store/selectors/function.selector';
import { FunctionPreviewComponent } from '../../previews/function-preview/function-preview.component';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IInputParam } from 'src/lib/process-builder/globals/i-input-param';
import { delay, map } from 'rxjs/operators';

import * as fromIFunctionState from 'src/lib/process-builder/store/reducers/function.reducer';
import { removeIFunction } from 'src/lib/process-builder/store/actions/i-function.actions';
import { showListAnimation } from 'src/lib/shared/animations/show-list';

@Component({
  selector: 'app-embedded-function-selection',
  templateUrl: './embedded-function-selection.component.html',
  styleUrls: ['./embedded-function-selection.component.sass'],
  animations: [showAnimation, showListAnimation]
})
export class EmbeddedFunctionSelectionComponent implements IEmbeddedView, OnDestroy, OnInit {

  @Input() public inputParams!: ParamCodes | ParamCodes[] | null;

  @ViewChildren(FunctionPreviewComponent, { read: ViewContainerRef }) private activeFunctionWrappers!: QueryList<ViewContainerRef>;

  public formGroup!: UntypedFormGroup;

  private _availableFunctions = new ReplaySubject<IFunction[]>(1);
  public availableFunctions$ = this._availableFunctions.asObservable();

  private _subscriptions: Subscription[] = [];

  constructor(private _store: Store<fromIFunctionState.State>) { }

  public ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  public ngOnInit(): void {
    this._subscriptions.push(...[
      this._store.select(selectIFunctions()).pipe(map(funcs => {
        return funcs.filter(x => {
          if (!x) return false;
          let requiredInputs: ParamCodes[] = (Array.isArray(x.inputParams) ? x.inputParams : [x.inputParams]).filter(y => y && typeof y === 'object' && !y.optional).map((x) => (x as IInputParam).param) as ParamCodes[];
          if (requiredInputs.length === 0) return true;
          let availableInputParams: ParamCodes[] = Array.isArray(this.inputParams) ? this.inputParams : this.inputParams ? [this.inputParams] : [];
          return true;
          return !requiredInputs.some(x => availableInputParams.indexOf(x) === -1);
        })
      })).subscribe((availableFunctions) => {
        this._availableFunctions.next(availableFunctions as IFunction[]);
      }),
      this.availableFunctions$.pipe(delay(800)).subscribe(() => {
        let ref = this.activeFunctionWrappers.find(x => (x.element.nativeElement as HTMLDivElement).hasAttribute('active'));
        if (ref) ref.element.nativeElement.scrollIntoView({ behavior: 'smooth' });
      })
    ])
  }

  public removeFunction(func: IFunction, evt?: Event) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    this._store.dispatch(removeIFunction(func));
  }

  public selectFunction(func: IFunction) {
    this.functionIdentifierControl.setValue(this.functionIdentifierControl.value === func.identifier ? null : func.identifier);
  }

  public get functionIdentifierControl(): UntypedFormControl {
    return this.formGroup.controls['functionIdentifier'] as UntypedFormControl;
  }

}
