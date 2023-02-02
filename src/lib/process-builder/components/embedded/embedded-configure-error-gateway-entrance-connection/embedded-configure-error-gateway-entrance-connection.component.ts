import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { EmbeddedView } from 'src/lib/process-builder/classes/embedded-view';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { ITaskCreationFormGroup } from 'src/lib/process-builder/interfaces/i-task-creation.interface';
import { GatewayType } from 'src/lib/process-builder/types/gateway.type';

@Component({
  selector: 'app-embedded-configure-error-gateway-entrance-connection',
  templateUrl: './embedded-configure-error-gateway-entrance-connection.component.html',
  styleUrls: ['./embedded-configure-error-gateway-entrance-connection.component.sass']
})
export class EmbeddedConfigureErrorGatewayEntranceConnectionComponent implements EmbeddedView {

  public formGroup = new FormGroup({
    entranceGatewayType: new FormControl(null)
  }) as FormGroup<Partial<ITaskCreationFormGroup>>;

  constructor(@Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig) { }

  public setValue(value: GatewayType) {
    this.formGroup.controls.entranceGatewayType!.setValue(value);
  }

}
