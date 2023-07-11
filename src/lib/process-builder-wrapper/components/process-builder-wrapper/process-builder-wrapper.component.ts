import { Component, Inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { map } from 'rxjs/operators';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { removePipeline } from 'src/lib/pipeline-store/store/actions/pipeline.actions';
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

  public modelsVisible = signal(false);
  public methodsVisible = signal(false);
  public paramsVisible = signal(false);

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
    if(!model){
      return;
    }

    const existingPipeline = await selectSnapshot(this._store.select(selectPipelineByBpmnJsModel(model.guid)));
    if(existingPipeline) {
      this._store.dispatch(removePipeline(existingPipeline));
    }

    this.bpmnJsService.compile(model.guid, model?.name ?? undefined);
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

  public toggleBpmnJsModels = () => this.modelsVisible.set(!this.modelsVisible());
  public toggleMethods = () => this.methodsVisible.set(!this.methodsVisible());
  public toggleParams = () => this.paramsVisible.set(!this.paramsVisible());

  public async logFunctions() {
    const funcs = await selectSnapshot(this._store.select(selectIFunctions()));
    console.log(funcs);
  }

  public async logParams() {
    const params = await selectSnapshot(this._store.select(selectIParams()));
    console.log(params);
  }

}
