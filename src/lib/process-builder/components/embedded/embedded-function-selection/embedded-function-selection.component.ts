import { Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { ParamCodes } from 'src/config/param-codes';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IFunction } from 'src/lib/process-builder/interfaces/function.interface';
import { Store } from '@ngrx/store';
import { selectIFunctions } from 'src/lib/process-builder/store/selectors/function.selector';
import { FunctionPreviewComponent } from '../../previews/function-preview/function-preview.component';
import { ControlContainer, FormControl } from '@angular/forms';
import { IInputParam } from 'src/lib/process-builder/interfaces/input-param.interface';
import { delay, map, startWith } from 'rxjs/operators';
import * as fromIFunctionState from 'src/lib/process-builder/store/reducers/function.reducer';
import { removeIFunction } from 'src/lib/process-builder/store/actions/function.actions';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { showAnimation } from 'src/lib/shared/animations/show';
import { showListAnimation } from 'src/lib/shared/animations/show-list';

@Component({
  selector: 'app-embedded-function-selection',
  templateUrl: './embedded-function-selection.component.html',
  styleUrls: ['./embedded-function-selection.component.scss'],
  animations: [showAnimation, showListAnimation]
})
export class EmbeddedFunctionSelectionComponent implements IEmbeddedView, OnDestroy, OnInit {

  @Input() public inputParams!: ParamCodes | ParamCodes[] | null;

  @ViewChildren(FunctionPreviewComponent, { read: ViewContainerRef }) private activeFunctionWrappers!: QueryList<ViewContainerRef>;
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

  private _availableFunctions = new ReplaySubject<IFunction[]>(1);
  public availableFunctions$ = this._availableFunctions.asObservable();

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

  public functionTemplates$ = this.functions$.pipe(map(funcs => funcs.filter(func => func.requireCustomImplementation)));
  public customFunctions$ = this.functions$.pipe(map(funcs => funcs.filter(func => func.customImplementation)));

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store<fromIFunctionState.State>, private _controlContainer: ControlContainer) { }

  public ngOnDestroy = () => this._subscription.unsubscribe();

  public ngOnInit(): void {
    this._subscription.add(...[
      this.availableFunctions$.pipe(delay(800)).subscribe(() => {
        const ref = this.activeFunctionWrappers.find(x => (x.element.nativeElement as HTMLDivElement).hasAttribute('active'));
        if (ref) {
          ref.element.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
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

  public toggleSearchInput(expand?: boolean) {
    this.searchinputExpanded = typeof expand === 'boolean' ? expand : !this.searchinputExpanded;
    this._searchInput.nativeElement[this.searchinputExpanded ? 'focus' : 'blur']();
  }

}
