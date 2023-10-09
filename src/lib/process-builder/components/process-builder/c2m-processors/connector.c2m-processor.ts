import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { IC2MProcessor } from "../interfaces/c2m-processor.interface";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Inject, Injectable } from "@angular/core";
import { IConnector } from "@/lib/bpmn-io/interfaces/connector.interface";
import { BPMN_JS } from "@/lib/process-builder/injection-token";
import { IBpmnJS, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";

@Injectable()
export class ConnectorC2MProcessor implements IC2MProcessor {

    constructor(@Inject(BPMN_JS) private _bpmnJs: IBpmnJS, @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _bpmnJsService: BpmnJsService) { }

    public async processConfiguration({ taskCreationPayload, formValue }: ITaskCreationOutput): Promise<void> {
        const connector = this._bpmnJsService.elementRegistryModule.get(taskCreationPayload.configureIncomingErrorGatewaySequenceFlow?.id ?? '') as IConnector | undefined;
        if (connector && formValue?.entranceGatewayType) {
            BPMNJsRepository.setSequenceFlowType(this._bpmnJs, connector, formValue.entranceGatewayType);
            this._applyConnectorDefaultLabels(connector, formValue);
        }
    }

    private _applyConnectorDefaultLabels(connector: IConnector, taskCreationFormGroupValue: ITaskCreationFormGroupValue) {
        const connectorLabel = taskCreationFormGroupValue.entranceGatewayType === 'Success'
            ? this._config.errorGatewayConfig.successConnectionName
            : this._config.errorGatewayConfig.errorConnectionName;

        this._bpmnJsService.modelingModule.updateLabel(connector, connectorLabel)
    }
}