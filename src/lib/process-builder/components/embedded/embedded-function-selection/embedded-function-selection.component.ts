import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ParamCodes } from 'src/config/param-codes';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IInputParam, IFunction } from '@process-builder/interfaces';
import { Store } from '@ngrx/store';
import { selectIFunction, selectIFunctions } from 'src/lib/process-builder/store/selectors/function.selector';
import { ControlContainer, FormControl } from '@angular/forms';
import { Subscription, defer, map, startWith, switchMap, timer } from 'rxjs';
import * as fromIFunctionState from 'src/lib/process-builder/store/reducers/function.reducer';
import { removeIFunction } from 'src/lib/process-builder/store/actions/function.actions';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { showAnimation } from 'src/lib/shared/animations/show';
import { showListAnimation } from 'src/lib/shared/animations/show-list-slow';

@Component({
  selector: 'app-embedded-function-selection',
  templateUrl: './embedded-function-selection.component.html',
  styleUrls: ['./embedded-function-selection.component.scss'],
  animations: [showAnimation, showListAnimation]
})
export class EmbeddedFunctionSelectionComponent implements IEmbeddedView, OnDestroy, AfterViewInit {

  @Input() public inputParams!: ParamCodes | ParamCodes[] | null;

  @ViewChild('searchInput', { static: true, read: ElementRef }) private _searchInput!: ElementRef<HTMLInputElement>;

  public filterControl = new FormControl<string>('');
  private _filter$ = this.filterControl.valueChanges.pipe(startWith(''), map(filter => {
    const transformed = (filter ?? '').trim().toLowerCase().split(' ').filter(segment => segment);
    return transformed;
  }));

  public get formGroup(): TaskCreationFormGroup {
    return this._controlContainer.control as TaskCreationFormGroup;
  }

  public searchinputExpanded = false;

  private _allFunctions$ = this._store.select(selectIFunctions());
  public functions$ = combineLatest([this._allFunctions$, this._filter$]).pipe(map(([functions, filter]) => {
    return functions.filter(func => {
      if (!func) {
        return false;
      }

      if (filter.length > 0) {
        const functionNameSegments = func.name.trim().toLowerCase().split(' ')
        const isNotMatchingFilter = filter.some(segment => functionNameSegments.every(functionSegment => functionSegment.indexOf(segment) === -1));
        if (isNotMatchingFilter) {
          return false;
        }
      }

      const inputTemplates = Array.isArray(func.inputTemplates) ? func.inputTemplates.filter(input => input !== 'dynamic') : [];
      const requiredInputTemplates = inputTemplates.filter(param => param && typeof param === 'object' && !param.optional).map((x) => (x as IInputParam).interface) as string[];
      if (requiredInputTemplates.length === 0) {
        return true;
      }

      const availableInputParams: ParamCodes[] = Array.isArray(this.inputParams) ? this.inputParams : this.inputParams ? [this.inputParams] : [];
      return true;
    });
  }));

  public functionTemplates$ = this.functions$.pipe(map(funcs => funcs.filter(func => !func._isImplementation)));
  public customFunctions$ = this.functions$.pipe(map(funcs => funcs.filter(func => func._isImplementation && func.customImplementation)));

  public selectedFunction$ = defer(() => {
    const control = this.formGroup.controls.functionIdentifier as FormControl;
    return control
      .valueChanges
      .pipe(
        startWith(control.value),
        switchMap((functionIdentifier) => this._store.select(selectIFunction(functionIdentifier as number)))
      );
  });
  public requiresCustomOutputParamName$ = this.selectedFunction$.pipe(map(selectedFunction => !selectedFunction?.requireCustomImplementation && !selectedFunction?.customImplementation && typeof selectedFunction?.outputTemplate === 'string'));

  private _subscriptions = new Subscription();

  constructor(private _store: Store<fromIFunctionState.State>, private _controlContainer: ControlContainer, private elementRef: ElementRef) { }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public ngAfterViewInit(): void {
    this._subscriptions.add(timer(200).subscribe(() => this._scrollToActiveFunction()));
  }

  public removeFunction(func: IFunction, evt?: Event) {
    if (evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    this._store.dispatch(removeIFunction(func));
  }

  public selectFunction(func: IFunction) {
    const functionIdentifier = this.formGroup.controls.functionIdentifier?.value === func.identifier ? null : func.identifier;
    this.formGroup.controls.functionIdentifier?.setValue(functionIdentifier);
    this.formGroup.patchValue({
      functionIdentifier: functionIdentifier
    });
  }

  public toggleSearchInput(expand?: boolean) {
    this.searchinputExpanded = typeof expand === 'boolean' ? expand : !this.searchinputExpanded;
    this._searchInput.nativeElement[this.searchinputExpanded ? 'focus' : 'blur']();
  }

  private _scrollToActiveFunction() {
    const ref = (this.elementRef.nativeElement as HTMLElement).querySelector('.function-wrapper.active');
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
