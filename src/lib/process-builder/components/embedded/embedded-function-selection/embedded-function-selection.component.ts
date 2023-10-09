import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild, signal } from '@angular/core';
import { ParamCodes } from 'src/config/param-codes';
import { IEmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IInputParam, IFunction } from '@process-builder/interfaces';
import { Store } from '@ngrx/store';
import { selectFunction, selectFunctions } from 'src/lib/process-builder/store/selectors/function.selector';
import { ControlContainer, FormControl } from '@angular/forms';
import { Subscription, defer, map, startWith, switchMap, timer } from 'rxjs';
import { removeIFunction } from 'src/lib/process-builder/store/actions/function.actions';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { TaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { showAnimation } from 'src/lib/shared/animations/show';
import { showListAnimation } from 'src/lib/shared/animations/show-list-slow';
import { ProcessBuilderRepository } from '@/lib/core/process-builder-repository';
import { FunctionFormGroupService } from '@/lib/process-builder/services/function-form-group.service';
import defaultImplementation from '@/lib/process-builder/globals/default-implementation';
import { CodemirrorRepository } from '@/lib/core/codemirror.repository';
import { selectSnapshot } from '@/lib/process-builder/globals/select-snapshot';
import { selectIParams } from '@/lib/process-builder/store/selectors';

@Component({
	selector: 'app-embedded-function-selection',
	templateUrl: './embedded-function-selection.component.html',
	styleUrls: ['./embedded-function-selection.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [showAnimation, showListAnimation],
})
export class EmbeddedFunctionSelectionComponent implements IEmbeddedView, OnDestroy, AfterViewInit {

	@Input() public inputParams!: ParamCodes | ParamCodes[] | null;
	@ViewChild('searchInput', { static: true, read: ElementRef }) private _searchInput!: ElementRef<HTMLInputElement>;

	public filterControl = new FormControl<string>('');
	public hintControl = new FormControl<string>({ disabled: true, value: '' });
	private _filter$ = this.filterControl.valueChanges.pipe(startWith(''), map(filter => {
		const transformed = (filter ?? '').trim().toLowerCase().split(' ').filter(segment => segment);
		return transformed;
	}));

	public get formGroup(): TaskCreationFormGroup {
		return this._controlContainer.control as TaskCreationFormGroup;
	}

	public searchinputExpanded = false;

	private _allFunctions$ = this._store.select(selectFunctions());
	public filteredFunctions$ = combineLatest([this._allFunctions$, this._filter$]).pipe(switchMap(async ([functions, filter]) => {
		const availableInputParamIds = Array.isArray(this.inputParams) ? this.inputParams : this.inputParams ? [this.inputParams] : [];
		const availableInputParams = await selectSnapshot(this._store.select(selectIParams(availableInputParamIds)));

		return functions
			.filter(func => {
				if (!func) return false;

				if (filter.length > 0) {
					const functionNameSegments = func.name.trim().toLowerCase().split(' ')
					const isNotMatchingFilter = filter.some(segment => functionNameSegments.every(functionSegment => functionSegment.indexOf(segment) === -1));
					if (isNotMatchingFilter) {
						return false;
					}
				}

				return true;
			})
			.map(func => {
				const inputTemplates = Array.isArray(func.inputTemplates) ? func.inputTemplates.filter(input => input !== 'dynamic') : [];
				const requiredInputs: IInputParam[] = inputTemplates.filter(param => typeof param === 'object' && !param.optional) as IInputParam[];
				const inputsAvailable = requiredInputs.length === 0? true: requiredInputs.every(requiredInput => availableInputParams.some(param => {
					if(requiredInput.type === 'object' && requiredInput.interface){
						return requiredInput.interface === param.interface;
					}
	
					return param.type === requiredInput.type;
				}));

				return { ...func, inputsAvailable };
			});
	}));

	public functions$ = this.filteredFunctions$.pipe(map(functions => functions.filter(func => func.inputsAvailable)));

	public functionTemplates$ = this.functions$.pipe(map(funcs => funcs.filter(func => !func._isImplementation)));
	public customFunctions$ = this.functions$.pipe(map(funcs => funcs.filter(func => func._isImplementation && func.customImplementation)));

	public selectedFunction$ = defer(() => {
		const control = this.formGroup.controls.functionIdentifier as FormControl;
		return control
			.valueChanges
			.pipe(
				startWith(control.value),
				switchMap((functionIdentifier) => this._store.select(selectFunction(functionIdentifier as number)))
			);
	});
	public requiresCustomOutputParamName$ = this.selectedFunction$.pipe(map(selectedFunction => !selectedFunction?.requireCustomImplementation && !selectedFunction?.customImplementation && typeof selectedFunction?.outputTemplate === 'string'));

	public hintVisible = signal(false);

	private _subscriptions = new Subscription();

	constructor(private _store: Store, private _controlContainer: ControlContainer, private elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) { }

	public displayHint(func: IFunction, event?: MouseEvent){
		if(event){
			event.stopPropagation();
			event.preventDefault();
		}

		this.hintControl.setValue(func.description ?? '');

		this.hintVisible.set(true);
	}

	public ngOnDestroy(): void {
		this._subscriptions.unsubscribe();
	}

	public ngAfterViewInit(): void {
		this._subscriptions.add(timer(200).subscribe(() => this._scrollToActiveFunction()));
	}

	public removeFunction(removedFunction: IFunction, evt?: Event) {
		if (evt) {
			evt.stopPropagation();
			evt.preventDefault();
		}

		this._store.dispatch(removeIFunction(removedFunction));
	}

	public async selectFunction(selectedFunction: IFunction) {
		const patchValue = await new FunctionFormGroupService(this._store).getFunctionFormGroupValue(selectedFunction, !this.formGroup.controls.outputParamName?.pristine);
		if (patchValue.functionIdentifier === this.formGroup.controls.functionIdentifier?.value) {
			this.formGroup.patchValue({
				functionIdentifier: null,
				functionCanFail: false,
				functionImplementation: CodemirrorRepository.stringToTextLeaf(defaultImplementation),
				functionFinalizesFlow: false,
				functionName: '',
				functionNormalizedName: '',
			});
		}
		else this.formGroup.patchValue(patchValue);

		this._changeDetectorRef.markForCheck();
	}

	public toggleSearchInput(expand?: boolean) {
		this.searchinputExpanded = typeof expand === 'boolean' ? expand : !this.searchinputExpanded;
		this._searchInput.nativeElement[this.searchinputExpanded ? 'focus' : 'blur']();
	}

	public setOutputParamName(event: Event) {
		const outputParamName = (event.target as HTMLInputElement).value;
		const normalizedName = ProcessBuilderRepository.normalizeName(outputParamName);

		this.formGroup.patchValue({
			outputParamName: outputParamName,
			outputParamNormalizedName: normalizedName,
		});
	}

	private _scrollToActiveFunction() {
		const ref = (this.elementRef.nativeElement as HTMLElement).querySelector('.function-wrapper.active');
		if (ref) {
			ref.scrollIntoView({ behavior: 'smooth' });
		}
	}

}
