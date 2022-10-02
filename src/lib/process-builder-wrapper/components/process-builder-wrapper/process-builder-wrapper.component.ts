import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProcessBuilderComponent } from 'src/lib/process-builder/components/process-builder/process-builder.component';
import { IBpmnJSModel } from 'src/lib/process-builder/interfaces/i-bpmn-js-model.interface';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmnjs.service';
import { createIBpmnJsModel, removeIBpmnJSModel, setCurrentIBpmnJSModel, updateCurrentIBpmnJSModelName } from 'src/lib/process-builder/store/actions/i-bpmn-js-model.actions';
import { selectCurrentIBpmnJSModel, selectCurrentIBpmnJSModelGuid, selectIBpmnJSModels } from 'src/lib/process-builder/store/selectors/i-bpmn-js-model.selectors';
import { showListAnimation } from 'src/lib/shared/animations/show-list';

@Component({
  selector: 'app-process-builder-wrapper',
  templateUrl: './process-builder-wrapper.component.html',
  styleUrls: ['./process-builder-wrapper.component.sass'],
  animations: [showListAnimation]
})
export class ProcessBuilderWrapperComponent {

  @ViewChild(ProcessBuilderComponent) processBuilderComponent!: ProcessBuilderComponent;

  public bpmnJSModels$ = this._store.select(selectIBpmnJSModels());
  public currentBpmnJSModel$ = this._store.select(selectCurrentIBpmnJSModel);
  public currentBpmnJSModelGuid$ = this._store.select(selectCurrentIBpmnJSModelGuid);

  private _modelsVisible = new BehaviorSubject<boolean>(true);
  private _methodsVisible = new BehaviorSubject<boolean>(false);
  private _paramsVisible = new BehaviorSubject<boolean>(false);

  public modelsVisible$ = this._modelsVisible.asObservable();
  public methodsVisible$ = this._methodsVisible.asObservable();
  public paramsVisible$ = this._paramsVisible.asObservable();

  constructor(private _store: Store, public bpmnJsService: BpmnJsService) { }

  public blurElement(element: HTMLElement, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    element.blur();
  }

  public createBpmnJsModel() {
    this._store.dispatch(createIBpmnJsModel());
  }

  public removeModel(bpmnJSModel: IBpmnJSModel) {
    this._store.dispatch(removeIBpmnJSModel(bpmnJSModel));
  }

  public renameCurrentModel(updatedTitle: string) {
    this._store.dispatch(updateCurrentIBpmnJSModelName(updatedTitle));
  }

  public setModel(bpmnJSModel: IBpmnJSModel) {
    this._store.dispatch(setCurrentIBpmnJSModel(bpmnJSModel));
  }

  public toggleModules() {
    this._modelsVisible.pipe(take(1)).subscribe((val: boolean) => this._modelsVisible.next(!val));
  }

  public toggleMethods() {
    this._methodsVisible.pipe(take(1)).subscribe((val: boolean) => this._methodsVisible.next(!val));
  }

  public toggleParams() {
    this._paramsVisible.pipe(take(1)).subscribe((val: boolean) => this._paramsVisible.next(!val));
  }

}
