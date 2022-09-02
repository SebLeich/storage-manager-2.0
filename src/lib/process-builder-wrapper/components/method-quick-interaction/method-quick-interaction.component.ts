import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProcessBuilderComponentService } from 'src/lib/process-builder/components/process-builder/process-builder-component.service';
import { IBpmnJSModel } from 'src/lib/process-builder/globals/i-bpmn-js-model';

@Component({
  selector: 'app-method-quick-interaction',
  templateUrl: './method-quick-interaction.component.html',
  styleUrls: ['./method-quick-interaction.component.css']
})
export class MethodQuickInteractionComponent implements OnDestroy, OnInit {

  formGroup: UntypedFormGroup;

  private _subscriptions: Subscription[] = [];

  constructor(
    public service: ProcessBuilderComponentService,
    private _formBuilder: UntypedFormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      name: null,
      guid: null,
      created: null,
      description: null,
      lastModified: null,
      viewbox: null,
      xml: null
    } as IBpmnJSModel);
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
    this._subscriptions.push(...[
      this.service.currentIBpmnJSModel$.subscribe((model) => {
        this.formGroup.reset();
        this.formGroup.patchValue(model, { emitEvent: false });
      }),
      this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
        this.service.updateIBpmnJSModel(value);
      })
    ]);
  }

  get nameControl(): UntypedFormControl {
    return this.formGroup.controls['name'] as UntypedFormControl;
  }

}
