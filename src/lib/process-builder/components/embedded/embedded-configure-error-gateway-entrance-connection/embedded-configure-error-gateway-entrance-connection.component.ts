import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorGatewayEvent } from 'src/lib/process-builder/globals/error-gateway-event';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';

@Component({
  selector: 'app-embedded-configure-error-gateway-entrance-connection',
  templateUrl: './embedded-configure-error-gateway-entrance-connection.component.html',
  styleUrls: ['./embedded-configure-error-gateway-entrance-connection.component.sass']
})
export class EmbeddedConfigureErrorGatewayEntranceConnectionComponent implements IEmbeddedView, OnDestroy {

  formGroup!: FormGroup;

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig
  ) { }

  ngOnDestroy(): void {

  }

  setValue(value: ErrorGatewayEvent) {
    this.entranceGatewayTypeControl.setValue(value);
  }

  ErrorGatewayEvent = ErrorGatewayEvent;

  get entranceGatewayTypeControl(): FormControl {
    return this.formGroup.controls['entranceGatewayType'] as FormControl;
  }

}
