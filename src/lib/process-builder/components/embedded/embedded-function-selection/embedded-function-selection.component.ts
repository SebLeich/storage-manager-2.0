import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { ParamCodes } from 'src/config/param-codes';
import { EmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import { showAnimation } from 'src/lib/shared/animations/show';
import { Store } from '@ngrx/store';
import { selectIFunctions } from 'src/lib/process-builder/store/selectors/function.selector';
import { FunctionPreviewComponent } from '../../previews/function-preview/function-preview.component';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IInputParam } from 'src/lib/process-builder/globals/i-input-param';
import { delay, map } from 'rxjs/operators';

import * as fromIFunctionState from 'src/lib/process-builder/store/reducers/function.reducer';
import { removeIFunction } from 'src/lib/process-builder/store/actions/function.actions';
import { showListAnimation } from 'src/lib/shared/animations/show-list';
import { ITaskCreationFormGroup } from 'src/lib/process-builder/interfaces/i-task-creation.interface';

@Component({
  selector: 'app-embedded-function-selection',
  templateUrl: './embedded-function-selection.component.html',
  styleUrls: ['./embedded-function-selection.component.scss'],
  animations: [showAnimation, showListAnimation]
})
export class EmbeddedFunctionSelectionComponent extends EmbeddedView implements OnDestroy, OnInit {

  @Input() public inputParams!: ParamCodes | ParamCodes[] | null;

  @ViewChildren(FunctionPreviewComponent, { read: ViewContainerRef }) private activeFunctionWrappers!: QueryList<ViewContainerRef>;

  public formGroup = new FormGroup({
    'functionIdentifier': new FormControl(null)
  }) as FormGroup<Partial<ITaskCreationFormGroup>>;

  private _availableFunctions = new ReplaySubject<IFunction[]>(1);
  public availableFunctions$ = this._availableFunctions.asObservable();

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<fromIFunctionState.State>) {
    super();
  }

  public ngOnDestroy = () => this._subscription.unsubscribe();

  public ngOnInit(): void {
    this._subscription.add(...[
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
    const functionIdentifier = this.formGroup.controls.functionIdentifier!.value === func.identifier ? null : func.identifier;
    this.formGroup.controls.functionIdentifier!.setValue(functionIdentifier);
  }

}
