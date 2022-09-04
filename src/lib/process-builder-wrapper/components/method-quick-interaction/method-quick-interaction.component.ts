import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProcessBuilderComponentService } from 'src/lib/process-builder/components/process-builder/process-builder-component.service';

@Component({
  selector: 'app-method-quick-interaction',
  templateUrl: './method-quick-interaction.component.html',
  styleUrls: ['./method-quick-interaction.component.css']
})
export class MethodQuickInteractionComponent implements OnDestroy, OnInit {

  formGroup: UntypedFormGroup;

  private _subscriptions: Subscription = new Subscription();

  constructor(
    public service: ProcessBuilderComponentService,
    private _formBuilder: UntypedFormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      name: '',
      guid: null,
      created: null,
      description: null,
      lastModified: null,
      viewbox: null,
      xml: null
    });
  }

  ngOnDestroy = () => this._subscriptions.unsubscribe();

  ngOnInit(): void {
    this._subscriptions.add(...[
      this.service.currentIBpmnJSModel$.subscribe((model) => {
        this.formGroup.reset();
        this.formGroup.patchValue(model as object, { emitEvent: false });
      }),
      this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
        this.service.updateIBpmnJSModel(value);
      })
    ]);
  }

  get nameControl(): FormControl<string> {
    return this.formGroup.controls['name'] as FormControl<string>;
  }

}
