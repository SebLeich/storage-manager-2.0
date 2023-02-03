import { Type } from '@angular/core';
import { IElement } from "src/lib/bpmn-io/interfaces/element.interface";
import { BPMNJsRepository } from "src/lib/core/bpmn-js.repository";
import { EmbeddedView } from "src/lib/process-builder/classes/embedded-view";
import { TaskCreationStep } from "src/lib/process-builder/globals/task-creation-step";
import { EmbeddedConfigureErrorGatewayEntranceConnectionComponent } from "../../../embedded/embedded-configure-error-gateway-entrance-connection/embedded-configure-error-gateway-entrance-connection.component";
import { EmbeddedFunctionImplementationComponent } from "../../../embedded/embedded-function-implementation/embedded-function-implementation.component";
import { EmbeddedFunctionInputSelectionComponent } from "../../../embedded/embedded-function-input-selection/embedded-function-input-selection.component";
import { EmbeddedFunctionSelectionComponent } from "../../../embedded/embedded-function-selection/embedded-function-selection.component";
import { EmbeddedInputOutputMappingComponent } from "../../../embedded/embedded-input-output-mapping/embedded-input-output-mapping.component";
import { EmbeddedParamEditorComponent } from "../../../embedded/embedded-param-editor/embedded-param-editor.component";

export default new Map<TaskCreationStep, {
    type: Type<EmbeddedView>;
    provideInputParams?: (component: EmbeddedView, element: IElement) => void;
    autoChangeTabOnValueEmission?: boolean;
}>([
    [TaskCreationStep.ConfigureErrorGatewayEntranceConnection, { type: EmbeddedConfigureErrorGatewayEntranceConnectionComponent }],
    [TaskCreationStep.ConfigureFunctionImplementation, {
        type: EmbeddedFunctionImplementationComponent,
        provideInputParams: (arg: EmbeddedView, element: IElement) => {
            const component = arg as EmbeddedFunctionImplementationComponent;
            component.inputParams = BPMNJsRepository.getAvailableInputParams(element);
        },
    }],
    [TaskCreationStep.ConfigureFunctionInput, {
        type: EmbeddedFunctionInputSelectionComponent,
        provideInputParams: (arg: EmbeddedView, element: IElement) => {
            let component = arg as EmbeddedFunctionInputSelectionComponent;
            let availableInputParams = BPMNJsRepository.getAvailableInputParams(element);
            component.setInputParams(availableInputParams);
        },
    }],
    [TaskCreationStep.ConfigureFunctionOutput, { type: EmbeddedParamEditorComponent }],
    [TaskCreationStep.ConfigureFunctionSelection, {
        type: EmbeddedFunctionSelectionComponent,
        provideInputParams: (arg: EmbeddedView, element: IElement) => {
            const component = arg as EmbeddedFunctionSelectionComponent;
            component.inputParams = BPMNJsRepository.getAvailableInputParams(element);
        },
    }],
    [TaskCreationStep.ConfigureInputOutputMapping, {
        type: EmbeddedInputOutputMappingComponent,
        provideInputParams: (arg: EmbeddedView, element: IElement) => {
            const component = arg as EmbeddedInputOutputMappingComponent;
            component.inputParams = BPMNJsRepository.getAvailableInputParams(element);
        },
    }],
]);