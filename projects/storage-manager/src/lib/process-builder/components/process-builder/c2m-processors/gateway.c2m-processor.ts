import { IC2MProcessor } from "../interfaces/c2m-processor.interface";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Inject, Injectable } from "@angular/core";
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import { ITaskCreationOutput } from "../../dialog/task-creation/interfaces/task-creation-output.interface";

@Injectable()
export class GatewayC2MProcessor implements IC2MProcessor {

    constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _bpmnJsService: BpmnJsService) { }

    public processConfiguration({ taskCreationPayload, formValue }: ITaskCreationOutput): void {
        const configureActivity = taskCreationPayload.configureActivity;
        if (!configureActivity || !formValue) {
            return;
        }

        const canFail = formValue.functionCanFail,
            outgoingErrorGatewaySequenceFlows = configureActivity
                .outgoing
                .filter(sequenceFlow => sequenceFlow.type === shapeTypes.SequenceFlow && sequenceFlow.target?.type === shapeTypes.ExclusiveGateway);

        const hasSomeGateways = outgoingErrorGatewaySequenceFlows.length > 0;

        if (canFail && !hasSomeGateways) {
            const reconnectGatewayTo = this._disconnectOutgoingElements(configureActivity);
            const gatewayShape = this._appendGateway(configureActivity);
            this._connectGatewayToElements(gatewayShape, reconnectGatewayTo);

            return;
        } 
        else if (!canFail && hasSomeGateways) this._bpmnJsService.modelingModule.removeElements([
            ...outgoingErrorGatewaySequenceFlows,
            ...outgoingErrorGatewaySequenceFlows.map(flow => flow.target),
            ...outgoingErrorGatewaySequenceFlows.flatMap(flow => flow.target.outgoing)
        ]);
    }

    private _appendGateway(configureActivity: IElement): IElement {
        const gatewayShape = this._bpmnJsService.modelingModule.appendShape(
            configureActivity,
            { type: shapeTypes.ExclusiveGateway },
            {
                x: configureActivity.x + 200,
                y: configureActivity.y + 40
            }
        );
        this._bpmnJsService.modelingModule.updateLabel(gatewayShape, this._config.errorGatewayConfig.gatewayName);

        return gatewayShape;
    }

    private _connectGatewayToElements(gatewayShape: IElement, targets: IElement[]){
        for(const target of targets){
            this._bpmnJsService.modelingModule.connect(gatewayShape, target);
        }
    }

    private _disconnectOutgoingElements(configureActivity: IElement): IElement[] {
        const formerConnectedTargetConnectors = configureActivity.outgoing
            .filter((outgoing) => outgoing.type === shapeTypes.SequenceFlow)
            .filter((element) => element ? true : false);

        const connectionTargets = formerConnectedTargetConnectors.map((connector) => connector.target);

        this._bpmnJsService.modelingModule.removeElements(formerConnectedTargetConnectors);

        return connectionTargets;
    }
}
