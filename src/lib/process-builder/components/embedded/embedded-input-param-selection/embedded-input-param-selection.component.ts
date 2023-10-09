import { ParamCodes } from '@/config/param-codes';
import { IEmbeddedView } from '@/lib/process-builder/classes/embedded-view';
import { TaskCreationFormGroup } from '@/lib/process-builder/interfaces/task-creation-form-group-value.interface';
import { selectFunction } from '@/lib/process-builder/store/selectors';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { defer, startWith, switchMap } from 'rxjs';

@Component({
	selector: 'app-embedded-input-param-selection',
	templateUrl: './embedded-input-param-selection.component.html',
	styleUrls: ['./embedded-input-param-selection.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbeddedInputParamSelectionComponent implements IEmbeddedView {
	@Input() public inputParams!: ParamCodes | ParamCodes[] | null;

	public get formGroup(): TaskCreationFormGroup {
		return this._controlContainer.control as TaskCreationFormGroup;
	}

	public selectedFunction$ = defer(() => {
		const control = this.formGroup.controls.functionIdentifier as FormControl;
		return control
			.valueChanges
			.pipe(
				startWith(control.value),
				switchMap((functionIdentifier) => this._store.select(selectFunction(functionIdentifier as number)))
			);
	});

	constructor(private _controlContainer: ControlContainer, private _store: Store) { }

}
