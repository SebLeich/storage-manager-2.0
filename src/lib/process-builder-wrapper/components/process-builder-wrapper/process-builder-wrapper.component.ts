import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { ProcessBuilderComponent } from 'src/lib/process-builder/components/process-builder/process-builder.component';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import { IBpmnJSModel } from 'src/lib/process-builder/interfaces/i-bpmn-js-model.interface';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmnjs.service';
import { createIBpmnJsModel, removeIBpmnJSModel, setCurrentIBpmnJSModel, updateCurrentIBpmnJSModel } from 'src/lib/process-builder/store/actions/i-bpmn-js-model.actions';
import { removeIFunction } from 'src/lib/process-builder/store/actions/i-function.actions';
import { selectCurrentIBpmnJSModel, selectCurrentIBpmnJSModelGuid, selectIBpmnJSModels } from 'src/lib/process-builder/store/selectors/i-bpmn-js-model.selectors';
import { selectIFunctions } from 'src/lib/process-builder/store/selectors/i-function.selector';
import { selectIParams } from 'src/lib/process-builder/store/selectors/i-param.selectors';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in';
import { showListAnimation } from 'src/lib/shared/animations/show-list';

@Component({
  selector: 'app-process-builder-wrapper',
  templateUrl: './process-builder-wrapper.component.html',
  styleUrls: ['./process-builder-wrapper.component.sass'],
  animations: [fadeInAnimation, showListAnimation]
})
export class ProcessBuilderWrapperComponent {

  @ViewChild(ProcessBuilderComponent) processBuilderComponent!: ProcessBuilderComponent;

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

  constructor(
    private _store: Store, 
    public bpmnJsService: BpmnJsService, 
    private _snackBar: MatSnackBar
  ) {
    this.currentBpmnJSModel$.subscribe(arg => console.log(arg));
  }

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

  public hideAllHints(){
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
    await this.saveCurrentBpmnModel();
  }

  public resetState() {
    localStorage.removeItem('params');
    localStorage.removeItem('funcs');
    localStorage.removeItem('models');
    location.reload();
  }

  public async saveCurrentBpmnModel() {
    const result: { xml: string } = await this.bpmnJsService.bpmnJs.saveXML();
    this._store.dispatch(updateCurrentIBpmnJSModel({ xml: result.xml }));
    this._snackBar.open('model saved', 'ok', { duration: 2000 });
    this.bpmnJsService.markAsUnchanged();
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

  public undo = () => (window as any).cli.undo();
  public redo = () => (window as any).cli.redo();
  public zoomIn = () => this.bpmnJsService.zoomScrollModule.stepZoom(1);
  public zoomOut = () => this.bpmnJsService.zoomScrollModule.stepZoom(-1);

}
