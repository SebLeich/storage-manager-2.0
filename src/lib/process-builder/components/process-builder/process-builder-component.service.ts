import { Injectable } from '@angular/core';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { DialogService } from '../../services/dialog.service';
import { switchMap, tap } from 'rxjs';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { TaskCreationStep } from '../../globals/task-creation-step';
import { selectSnapshot } from '../../globals/select-snapshot';
import { Store } from '@ngrx/store';
import { removeIFunction, setIFunctionsCanFailFlag } from '@process-builder/actions';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { FunctionFormGroupService } from '../../services/function-form-group.service';
import { selectFunction, selectFunctions } from '../../store/selectors';
import { IConnector } from '@/lib/bpmn-io/interfaces/connector.interface';
import { ConfirmationService } from '@/lib/confirmation/services/confirmation.service';

@Injectable()
export class ProcessBuilderComponentService {

	public taskEditingDialogResultReceived$ = this._bpmnJsService.bufferedTaskEditingEvents$
		.pipe(
			tap(() => (document.activeElement as HTMLElement)?.blur()),
			switchMap(async (events) => {
				const functionSelectionConfig = events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection);
				const functionIdentifier = BPMNJsRepository.getSLPBExtension<number>(functionSelectionConfig?.element?.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId) ?? null;
				const selectedFunction = await selectSnapshot(this._store.select(selectFunction(functionIdentifier)));
				const formValue = await new FunctionFormGroupService(this._store).getFunctionFormGroupValue(selectedFunction, false);

				return { events, formValue, functionSelectionConfig, selectedFunction };
			}),
			switchMap(({ events, formValue }) => {
				const taskCreationPayload = {
					configureActivity: events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection)?.element as IElement ?? null,
					configureIncomingErrorGatewaySequenceFlow: events.find(event => event.taskCreationStep === TaskCreationStep.ConfigureErrorGatewayEntranceConnection)?.element as IConnector ?? undefined
				};

				return this._dialogService.configTaskCreation({ taskCreationFormGroupValue: formValue, taskCreationPayload });
			})
		);

	constructor(
		private _dialogService: DialogService,
		private _bpmnJsService: BpmnJsService,
		private _store: Store,
		private _confirmationService: ConfirmationService
	) { }

	public async tryDeleteErrorGateway(element: IElement) {
		const comingFromActivities = element
			.incoming
			.filter(incoming => incoming.type === shapeTypes.SequenceFlow && incoming.source.type === shapeTypes.Task)
			.map(incoming => incoming.source);

		const referencedFunctionIdentifiers = comingFromActivities.map(activity => BPMNJsRepository.getSLPBExtension(activity.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId));
		const referencedFunctions = await selectSnapshot(this._store.select(selectFunctions(referencedFunctionIdentifiers)));

		const result = await this._confirmationService.requestConfirmation(
			`${referencedFunctions.length === 1 ? 'One method' : referencedFunctions.length + ' methods'} will be changed`,
			`By deleting that gateway, you will remove the 'canFail'-flag from the methods listed below.<ul>${referencedFunctions.map(func => '<li>' + func.normalizedName + '</li>')}</ul><b>Do you want to proceed?</b>`
		);

		if (!result) {
			return;
		}

		const action = setIFunctionsCanFailFlag({ funcs: referencedFunctionIdentifiers, canFail: false });
		this._store.dispatch(action);
		this._bpmnJsService.modelingModule.removeElements([element]);
		this._bpmnJsService.saveCurrentBpmnModel();
	}

	public async tryDeleteFunction(element: IElement) {
		const referencedFunctionIdentifier = BPMNJsRepository.getSLPBExtension(element.businessObject, 'ActivityExtension', (ext) => ext.activityFunctionId);
		const func = await selectSnapshot(this._store.select(selectFunction(referencedFunctionIdentifier)));

		const result = func?.customImplementation ? await this._confirmationService.requestConfirmation(
			`${func.normalizedName} will be deleted`,
			`By deleting that activity, you will remove the method '${func.normalizedName}', all resulting parameters and all following gateways. That may break your pipeline!</br><b>Do you want to proceed?</b>`
		) : true;

		if (!result) {
			return;
		}

		this._bpmnJsService.removeOutgoingDataObjectReferences(element);
		this._bpmnJsService.removeOutgoingGateways(element);
		this._bpmnJsService.modelingModule.removeElements([element]);
		if (func?.customImplementation) {
			this._store.dispatch(removeIFunction(func));
		}

		this._bpmnJsService.saveCurrentBpmnModel();
	}
}
