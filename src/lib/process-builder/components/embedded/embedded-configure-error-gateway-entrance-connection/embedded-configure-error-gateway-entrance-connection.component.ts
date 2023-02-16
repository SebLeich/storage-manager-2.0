import { Component, Inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { EmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { ITaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation.interface';
import { GatewayType } from 'src/lib/process-builder/types/gateway.type';

@Component({
  selector: 'app-embedded-configure-error-gateway-entrance-connection',
  templateUrl: './embedded-configure-error-gateway-entrance-connection.component.html',
  styleUrls: ['./embedded-configure-error-gateway-entrance-connection.component.sass']
})
export class EmbeddedConfigureErrorGatewayEntranceConnectionComponent implements EmbeddedView {

  public successActionDefined = false;
  public errorActionDefined = false;
  private _gateway: IElement | null = null;
  public set gateway(gateway: IElement){
    	this._gateway = gateway;
      const outgoingConnectorTypes = gateway.outgoing.map(connector => {
        return BPMNJsRepository.getSLPBExtension(connector.businessObject, 'SequenceFlowExtension', (ext) => ext.sequenceFlowType) as 'success' | 'error';
      });
      this.successActionDefined = outgoingConnectorTypes.indexOf('success') > -1;
      this.errorActionDefined = outgoingConnectorTypes.indexOf('error') > -1;
  }

  public get formGroup() {
    return this._controlContainer.control as FormGroup<Partial<ITaskCreationFormGroup>>;
  }

  constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig, private _controlContainer: ControlContainer) { }

  public setValue(value: GatewayType) {
    this.formGroup.controls.entranceGatewayType!.setValue(value);
  }

}
