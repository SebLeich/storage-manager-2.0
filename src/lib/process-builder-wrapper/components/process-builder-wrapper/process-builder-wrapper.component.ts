import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import { INJECTOR_INTERFACE_TOKEN, INJECTOR_TOKEN } from 'src/lib/process-builder/globals/injector';
import { IBpmnJSModel } from 'src/lib/process-builder/interfaces/i-bpmn-js-model.interface';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';
import { ProcessBuilderService } from 'src/lib/process-builder/services/process-builder.service';
import { removeIBpmnJSModel, setCurrentIBpmnJSModel, updateCurrentIBpmnJSModel } from 'src/lib/process-builder/store/actions/i-bpmn-js-model.actions';
import { removeIFunction } from 'src/lib/process-builder/store/actions/i-function.actions';
import { selectCurrentIBpmnJSModel, selectCurrentIBpmnJSModelGuid, selectIBpmnJSModels } from 'src/lib/process-builder/store/selectors/i-bpmn-js-model.selectors';
import { selectIFunctions } from 'src/lib/process-builder/store/selectors/i-function.selector';
import { selectIParams } from 'src/lib/process-builder/store/selectors/i-param.selectors';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in.animation';
import { showListAnimation } from 'src/lib/shared/animations/show-list';

@Component({
  selector: 'app-process-builder-wrapper',
  templateUrl: './process-builder-wrapper.component.html',
  styleUrls: ['./process-builder-wrapper.component.sass'],
  animations: [fadeInAnimation, showListAnimation],
  providers: [
    { provide: INJECTOR_INTERFACE_TOKEN, useValue: {} },
    { provide: INJECTOR_TOKEN, useValue: {} },
  ]
})
export class ProcessBuilderWrapperComponent {

  public bpmnJSModels$ = this._store.select(selectIBpmnJSModels());
  public funcs$ = this._store.select(selectIFunctions());
  public params$ = this._store.select(selectIParams());
  public currentBpmnJSModel$ = this._store.select(selectCurrentIBpmnJSModel);
  public hasCurrentBpmnJSModel$ = this.currentBpmnJSModel$.pipe(map(currentBpmnJSModel => !!currentBpmnJSModel));
  public currentBpmnJSModelGuid$ = this._store.select(selectCurrentIBpmnJSModelGuid);

  private _modelsVisible = new BehaviorSubject<boolean>(true);
  private _methodsVisible = new BehaviorSubject<boolean>(false);
  private _paramsVisible = new BehaviorSubject<boolean>(false);

  public modelsVisible$ = this._modelsVisible.asObservable();
  public methodsVisible$ = this._methodsVisible.asObservable();
  public paramsVisible$ = this._paramsVisible.asObservable();

  constructor(private _store: Store, public bpmnJsService: BpmnJsService, public processBuilderService: ProcessBuilderService) { }

  public blurElement(element: HTMLElement, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    element.blur();
  }

  public hideAllHints() {
    BPMNJsRepository.clearAllTooltips(this.bpmnJsService.bpmnJs);
  }

  public removeFunction(func: IFunction) {
    this._store.dispatch(removeIFunction(func));
  }

  public removeModel(bpmnJSModel: IBpmnJSModel) {
    this._store.dispatch(removeIBpmnJSModel(bpmnJSModel));
  }

  public async renameCurrentModel(updatedName: string) {
    this._store.dispatch(updateCurrentIBpmnJSModel({ name: updatedName }));
  }

  public setModel(bpmnJSModel: IBpmnJSModel) {
    this._store.dispatch(setCurrentIBpmnJSModel(bpmnJSModel));
  }

  public toggleBpmnJsModels() {
    this._modelsVisible.pipe(take(1)).subscribe((val: boolean) => this._modelsVisible.next(!val));
  }

  public toggleMethods() {
    this._methodsVisible.pipe(take(1)).subscribe((val: boolean) => this._methodsVisible.next(!val));
  }

  public toggleParams() {
    this._paramsVisible.pipe(take(1)).subscribe((val: boolean) => this._paramsVisible.next(!val));
  }

}
