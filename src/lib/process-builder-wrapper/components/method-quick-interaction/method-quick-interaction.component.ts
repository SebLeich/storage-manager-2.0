import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IElement } from 'src/lib/bpmn-io/interfaces/i-element.interface';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { ValidationError } from 'src/lib/process-builder/globals/validation-error';
import { ValidationWarning } from 'src/lib/process-builder/globals/validation-warning';
import { ValidationErrorPipe } from 'src/lib/process-builder/pipes/validation-error.pipe';
import { ValidationWarningPipe } from 'src/lib/process-builder/pipes/validation-warning.pipe';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';
import { createIBpmnJsModel, updateCurrentIBpmnJSModel, updateIBpmnJSModel } from 'src/lib/process-builder/store/actions/i-bpmn-js-model.actions';
import { selectCurrentIBpmnJSModel } from 'src/lib/process-builder/store/selectors/i-bpmn-js-model.selectors';

@Component({
  selector: 'app-method-quick-interaction',
  templateUrl: './method-quick-interaction.component.html',
  styleUrls: ['./method-quick-interaction.component.css']
})
export class MethodQuickInteractionComponent implements OnDestroy, OnInit {

  public currentBpmnJSModel$ = this._store.select(selectCurrentIBpmnJSModel);

  formGroup: UntypedFormGroup;

  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _store: Store,
    private _formBuilder: UntypedFormBuilder,
    public bpmnJsService: BpmnJsService,
    private _snackBar: MatSnackBar
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

  public createBpmnJsModel() {
    this._store.dispatch(createIBpmnJsModel());
  }

  public hideAllHints = () => BPMNJsRepository.clearAllTooltips(this.bpmnJsService.bpmnJs);
  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public ngOnInit(): void {
    this._subscriptions.add(...[
      this.currentBpmnJSModel$.subscribe((model) => {
        this.formGroup.reset();
        this.formGroup.patchValue(model as object, { emitEvent: false });
      }),
      this.formGroup.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
        this._store.dispatch(updateIBpmnJSModel(value));
        this.formGroup.markAsPristine();
      })
    ]);
  }

  public async saveCurrentBpmnModel() {
    const result: { xml: string } = await this.bpmnJsService.bpmnJs.saveXML();
    this._store.dispatch(updateCurrentIBpmnJSModel({ xml: result.xml }));
    this._snackBar.open('model saved', 'ok', { duration: 2000 });
    this.bpmnJsService.markAsUnchanged();
  }

  public resetState() {
    localStorage.removeItem('params');
    localStorage.removeItem('funcs');
    localStorage.removeItem('models');
    location.reload();
  }

  public showError(error: { element?: IElement, error: ValidationError }): void {
    this.hideAllHints();
    if (!error?.element) {
      return;
    }

    this.bpmnJsService.tooltipModule.add({
      position: {
        x: error.element.x,
        y: error.element.y + error.element.height + 3
      },
      html:
        `<div style="width: 120px; background: #f44336de; color: white; font-size: .7rem; padding: .2rem .3rem; border-radius: 2px; line-height: .8rem;">${new ValidationErrorPipe().transform(error.error)}</div>`
    });
  }

  public showWarning(warning: { element?: IElement, warning: ValidationWarning }): void {
    this.hideAllHints();
    if (!warning.element) {
      return;
    }

    this.bpmnJsService.tooltipModule.add({
      position: {
        x: warning.element?.x,
        y: warning.element?.y + warning.element?.height + 3
      },
      html:
        `<div style="width: 120px; background: #ffb200; color: white; font-size: .7rem; padding: .2rem .3rem; border-radius: 2px; line-height: .8rem;">${new ValidationWarningPipe().transform(warning.warning)}</div>`
    });
  }

  get nameControl(): FormControl<string> {
    return this.formGroup.controls['name'] as FormControl<string>;
  }

}
