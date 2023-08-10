import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { IC2mProcessor } from "../interfaces/c2m-processor.interface";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Inject, Injectable } from "@angular/core";
import { IConnector } from "@/lib/bpmn-io/interfaces/connector.interface";
import { BPMN_JS } from "@/lib/process-builder/injection-token";
import { IBpmnJS, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";

@Injectable()
export class ConnectorC2MProcessor implements IC2mProcessor {

    constructor(@Inject(BPMN_JS) private _bpmnJs: IBpmnJS, @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _bpmnJsService: BpmnJsService) { }

    public async processConfiguration({ taskCreationPayload, taskCreationFormGroupValue }: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }) {
        const connector = this._bpmnJsService.elementRegistryModule.get(taskCreationPayload.configureIncomingErrorGatewaySequenceFlow?.id ?? '') as IConnector | undefined;
        if (connector && taskCreationFormGroupValue?.entranceGatewayType) {
            BPMNJsRepository.setSequenceFlowType(this._bpmnJs, connector, taskCreationFormGroupValue.entranceGatewayType);
            this._applyConnectorDefaultLabels(connector, taskCreationFormGroupValue);
        }
    }

    private _applyConnectorDefaultLabels(connector: IConnector, taskCreationFormGroupValue: ITaskCreationFormGroupValue) {
        const connectorLabel = taskCreationFormGroupValue.entranceGatewayType === 'Success'
            ? this._config.errorGatewayConfig.successConnectionName
            : this._config.errorGatewayConfig.errorConnectionName;

        this._bpmnJsService.modelingModule.updateLabel(connector, connectorLabel)
    }
}