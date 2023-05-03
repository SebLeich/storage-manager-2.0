import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { map } from 'rxjs/operators';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { removeIPipeline } from 'src/lib/pipeline-store/store/actions/pipeline.actions';
import { selectPipelineByBpmnJsModel } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import { IBpmnJS, IBpmnJSModel, IFunction } from '@process-builder/interfaces';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';
import { ProcessBuilderService } from 'src/lib/process-builder/services/process-builder.service';
import { removeIBpmnJSModel, setCurrentIBpmnJSModel, updateCurrentIBpmnJSModel } from 'src/lib/process-builder/store/actions/bpmn-js-model.actions';
import { removeIFunction } from 'src/lib/process-builder/store/actions/function.actions';
import { selectCurrentIBpmnJSModel, selectCurrentIBpmnJSModelGuid, selectIBpmnJSModels } from 'src/lib/process-builder/store/selectors/bpmn-js-model.selectors';
import { selectIFunctions, selectIParams } from '@process-builder/selectors';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in.animation';
import { showListAnimation } from 'src/lib/shared/animations/show-list';
import { BPMN_JS } from '@process-builder/injection';

@Component({
  selector: 'app-process-builder-wrapper',
  templateUrl: './process-builder-wrapper.component.html',
  styleUrls: ['./process-builder-wrapper.component.sass'],
  animations: [fadeInAnimation, showListAnimation]
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

  constructor(
    @Inject(BPMN_JS) private _bpmnJs: IBpmnJS,
    private _store: Store,
    public bpmnJsService: BpmnJsService,
    public processBuilderService: ProcessBuilderService
  ) { }

  public blurElement(element: HTMLElement, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    element.blur();
  }

  public async compile() {
    const model = await firstValueFrom(this.currentBpmnJSModel$);
    const existingPipeline = await selectSnapshot(this._store.select(selectPipelineByBpmnJsModel(model!.guid)));
    if (existingPipeline) this._store.dispatch(removeIPipeline(existingPipeline));
    this.bpmnJsService.compile(model!.guid, model?.name ?? undefined);
  }

  public hideAllHints() {
    BPMNJsRepository.clearAllTooltips(this._bpmnJs);
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

  public async toggleBpmnJsModels() {
    const modelsVisible = await selectSnapshot(this._modelsVisible);
    this._modelsVisible.next(!modelsVisible);
  }

  public async toggleMethods() {
    const methodsVisible = await selectSnapshot(this._methodsVisible);
    this._methodsVisible.next(!methodsVisible);
  }

  public async toggleParams() {
    const paramsVisible = await selectSnapshot(this._paramsVisible);
    this._paramsVisible.next(!paramsVisible);
  }

  public async logFunctions() {
    const funcs = await selectSnapshot(this._store.select(selectIFunctions()));
    console.log(funcs);
  }

  public async logParams() {
    const params = await selectSnapshot(this._store.select(selectIParams()));
    console.log(params);
  }

}
