import { Component, Inject, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { GatewayType } from 'src/lib/process-builder/types/gateway.type';

@Component({
  selector: 'app-embedded-configure-error-gateway-entrance-connection',
  templateUrl: './embedded-configure-error-gateway-entrance-connection.component.html',
  styleUrls: ['./embedded-configure-error-gateway-entrance-connection.component.sass']
})
export class EmbeddedConfigureErrorGatewayEntranceConnectionComponent implements IEmbeddedView, OnDestroy {

  public formGroup!: UntypedFormGroup;

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig
  ) { }

  public ngOnDestroy(): void {
      
  }

  public setValue(value: GatewayType) {
    this.entranceGatewayTypeControl.setValue(value);
  }

  public get entranceGatewayTypeControl(): UntypedFormControl {
    return this.formGroup?.controls['entranceGatewayType'] as UntypedFormControl;
  }

}
