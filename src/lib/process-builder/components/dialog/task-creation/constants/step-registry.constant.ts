import { Type } from '@angular/core';
import { IConnector } from 'src/lib/bpmn-io/interfaces/connector.interface';
import { IElement } from "src/lib/bpmn-io/interfaces/element.interface";
import { BPMNJsRepository } from "src/lib/core/bpmn-js.repository";
import { IEmbeddedView } from "src/lib/process-builder/classes/embedded-view";
import { TaskCreationStep } from "src/lib/process-builder/globals/task-creation-step";
import { EmbeddedConfigureErrorGatewayEntranceConnectionComponent } from "../../../embedded/embedded-configure-error-gateway-entrance-connection/embedded-configure-error-gateway-entrance-connection.component";
import { EmbeddedFunctionImplementationComponent } from "../../../embedded/embedded-function-implementation/embedded-function-implementation.component";
import { EmbeddedFunctionSelectionComponent } from "../../../embedded/embedded-function-selection/embedded-function-selection.component";
import { EmbeddedInputOutputMappingComponent } from "../../../embedded/embedded-input-output-mapping/embedded-input-output-mapping.component";
import { EmbeddedInputParamSelectionComponent } from '../../../embedded/embedded-input-param-selection/embedded-input-param-selection.component';

export default new Map<TaskCreationStep, {
    type: Type<IEmbeddedView>;
    provideInputParams?: (component: IEmbeddedView, element: any) => void;
}>([
    [TaskCreationStep.ConfigureErrorGatewayEntranceConnection, {
        type: EmbeddedConfigureErrorGatewayEntranceConnectionComponent,
        provideInputParams: (arg: IEmbeddedView, element: IConnector) => {
            const component = arg as EmbeddedConfigureErrorGatewayEntranceConnectionComponent;
            component.gateway = element.source;
        },
    }],
    [TaskCreationStep.ConfigureFunctionImplementation, {
        type: EmbeddedFunctionImplementationComponent,
        provideInputParams: (arg: IEmbeddedView, element: IElement) => {
            const component = arg as EmbeddedFunctionImplementationComponent;
            component.inputParams = BPMNJsRepository.getAvailableInputParams(element);
        },
    }],
    [TaskCreationStep.ConfigureFunctionSelection, {
        type: EmbeddedFunctionSelectionComponent,
        provideInputParams: (arg: IEmbeddedView, element: IElement) => {
            const component = arg as EmbeddedFunctionSelectionComponent;
            component.inputParams = BPMNJsRepository.getAvailableInputParams(element);
        },
    }],
    [TaskCreationStep.ConfigureInputOutputMapping, {
        type: EmbeddedInputOutputMappingComponent,
        provideInputParams: (arg: IEmbeddedView, element: IElement) => {
            const component = arg as EmbeddedInputOutputMappingComponent;
            component.inputParams = BPMNJsRepository.getAvailableInputParams(element);
        },
    }],
    [TaskCreationStep.ConfigureFunctionInput, {
        type: EmbeddedInputParamSelectionComponent,
        provideInputParams: (arg: IEmbeddedView, element: IElement) => {
            const component = arg as EmbeddedInputParamSelectionComponent;
            component.inputParams = BPMNJsRepository.getAvailableInputParams(element);
        },
    }],
]);