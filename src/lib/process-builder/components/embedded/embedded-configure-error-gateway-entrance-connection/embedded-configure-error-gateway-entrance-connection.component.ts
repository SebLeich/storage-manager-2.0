import { Component, Inject, OnInit } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { EmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { ITaskCreationFormGroup } from 'src/lib/process-builder/interfaces/task-creation.interface';
import { GatewayType } from 'src/lib/process-builder/types/gateway.type';

@Component({
  selector: 'app-embedded-configure-error-gateway-entrance-connection',
  templateUrl: './embedded-configure-error-gateway-entrance-connection.component.html',
  styleUrls: ['./embedded-configure-error-gateway-entrance-connection.component.sass']
})
export class EmbeddedConfigureErrorGatewayEntranceConnectionComponent implements EmbeddedView, OnInit {

  public get formGroup() {
    return this._controlContainer.control as FormGroup<Partial<ITaskCreationFormGroup>>;
  }

  constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig, private _controlContainer: ControlContainer) { }

  public ngOnInit(): void {
      
  }

  public setValue(value: GatewayType) {
    this.formGroup.controls.entranceGatewayType!.setValue(value);
  }

}
