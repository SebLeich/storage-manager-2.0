import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';

@Component({
  selector: '[app-embedded-input-output-mapping]',
  templateUrl: './embedded-input-output-mapping.component.html',
  styleUrls: ['./embedded-input-output-mapping.component.sass']
})
export class EmbeddedInputOutputMappingComponent implements IEmbeddedView, OnDestroy, OnInit {

  formGroup!: FormGroup;

  constructor() { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    console.log(this.outputParamValueControl.value);
  }

  get outputParamValueControl(): FormControl {
    return this.formGroup.controls['outputParamValue'] as FormControl;
  }

}
