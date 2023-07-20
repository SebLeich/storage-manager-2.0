import { ITaskCreationFormGroupValue } from "@/lib/process-builder/interfaces/task-creation-form-group-value.interface";
import { ITaskCreationPayload } from "@/lib/process-builder/interfaces/task-creation-payload.interface";
import { IC2mProcessor } from "../interfaces/c2m-processor.interface";
import { BPMNJsRepository } from "@/lib/core/bpmn-js.repository";
import { BpmnJsService } from "@/lib/process-builder/services/bpmn-js.service";
import { Inject, Injectable } from "@angular/core";
import { BPMN_JS } from "@/lib/process-builder/injection-token";
import { IBpmnJS, IFunction, IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from "@/lib/process-builder/interfaces";
import shapeTypes from "@/lib/bpmn-io/shape-types";
import { C2mProcessingObjects } from "../constants/c2m-processing-objects.constant";
import { IElement } from "@/lib/bpmn-io/interfaces/element.interface";
import { selectSnapshot } from "@/lib/process-builder/globals/select-snapshot";
import { timer } from "rxjs";

@Injectable()
export class GatewayC2MProcessor implements IC2mProcessor {

    public requirements = ['updatedFunction' as keyof C2mProcessingObjects];

    constructor(@Inject(BPMN_JS) private _bpmnJs: IBpmnJS, @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig, private _bpmnJsService: BpmnJsService) { }

    public async processConfiguration({ taskCreationPayload }: { taskCreationPayload: ITaskCreationPayload, taskCreationFormGroupValue?: ITaskCreationFormGroupValue }, c2mProcessingObject: Partial<C2mProcessingObjects>) {
        console.log(`processing gateways ...`);
        await selectSnapshot(timer(2000));
        
        const updatedFunction = c2mProcessingObject.updatedFunction,
            configureActivity = taskCreationPayload.configureActivity;

        if (!updatedFunction || !configureActivity) {
            return;
        }

        const resultingGateway = this._handleErrorGatewayConfiguration(configureActivity, updatedFunction);
        if (!resultingGateway) {
            return;
        }

        return Promise.resolve({ resultingGateway: resultingGateway });
    }

    private _handleErrorGatewayConfiguration(configureActivity: IElement, resultingFunction: IFunction) {
        const outgoingErrorGatewaySequenceFlow = configureActivity
            .outgoing
            .find(sequenceFlow => sequenceFlow.type === shapeTypes.SequenceFlow && sequenceFlow.target?.type === shapeTypes.ExclusiveGateway);

        let gatewayShape = outgoingErrorGatewaySequenceFlow?.target;

        if (resultingFunction.canFail && !gatewayShape) {
            const outgoingSequenceFlows = configureActivity.outgoing.filter(outgoing => outgoing.type === shapeTypes.SequenceFlow);
            const formerConnectedTargets = outgoingSequenceFlows.map(outgoingSequenceFlow => outgoingSequenceFlow.target);
            this._bpmnJsService.modelingModule.removeElements(formerConnectedTargets);

            gatewayShape = this._bpmnJsService.modelingModule.appendShape(
                configureActivity,
                { type: shapeTypes.ExclusiveGateway },
                {
                    x: configureActivity.x + 200,
                    y: configureActivity.y + 40
                }
            );

            this._bpmnJsService.modelingModule.updateLabel(gatewayShape, this._config.errorGatewayConfig.gatewayName);

            // reconnect the former connected target as success action
            if (formerConnectedTargets[0]) {
                const connector = this._bpmnJsService.modelingModule.connect(gatewayShape, formerConnectedTargets[0]);
                BPMNJsRepository.updateBpmnElementSLPBExtension(this._bpmnJs, connector.businessObject, 'SequenceFlowExtension', (ext) => ext.sequenceFlowType = 'success');
            }
        } else if (!resultingFunction.canFail && gatewayShape) {
            this._bpmnJsService.modelingModule.removeElements([gatewayShape, ...gatewayShape.incoming, ...gatewayShape.outgoing]);
        }

        return gatewayShape;
    }
}