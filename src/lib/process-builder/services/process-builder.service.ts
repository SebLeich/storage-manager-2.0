import { Inject, Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../globals/i-process-builder-config';
import { Store } from '@ngrx/store';
import { selectIFunctions } from '../store/selectors/function.selector';
import { selectCurrentIBpmnJSModelGuid, selectIBpmnJSModels } from '../store/selectors/bpmn-js-model.selectors';
import { createIBpmnJsModel, setCurrentIBpmnJSModel } from '../store/actions/bpmn-js-model.actions';
import { selectSnapshot } from '../globals/select-snapshot';
import { selectCurrentParamOutput, selectIParams } from '../store/selectors/param.selectors';

@Injectable()
export class ProcessBuilderService {

  public funcs$ = this._store.select(selectIFunctions());
  public models$ = this._store.select(selectIBpmnJSModels());
  public params$ = this._store.select(selectIParams());

  public currentProcessOutput$ = this._store.select(selectCurrentParamOutput);

  private _config = new ReplaySubject<IProcessBuilderConfig>(1);
  public config$ = this._config.asObservable();

  constructor(
    @Optional() @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private config: IProcessBuilderConfig,
    private _store: Store
  ) {
    if (!this.config) {
      config = this.defaultConfig;
    }
    this.setConfig(config);
  }

  public createBpmnJsModel() {
    this._store.dispatch(createIBpmnJsModel());
  }

  public resetLocalState() {
    localStorage.removeItem('funcs');
    localStorage.removeItem('models');
    localStorage.removeItem('params');
    this._reloadLocation();
  }

  public setConfig(arg: any) {
    this._config.next(arg);
  }

  public async setNextModel() {
    const bpmnJsModels = await selectSnapshot(this._store.select(selectIBpmnJSModels()));
    const currentBpmnJsModelGuid = await selectSnapshot(this._store.select(selectCurrentIBpmnJSModelGuid));
    if (bpmnJsModels.length < 2 || typeof currentBpmnJsModelGuid !== 'string') {
      return;
    }

    const index = bpmnJsModels.findIndex(bpmnJsModel => bpmnJsModel.guid === currentBpmnJsModelGuid);
    const nextIndex = index >= (bpmnJsModels.length - 1) ? 0 : index + 1;
    this._store.dispatch(setCurrentIBpmnJSModel(bpmnJsModels[nextIndex]));
  }

  public toggleEvents = () => this._config.pipe(take(1)).subscribe((value) => {
    value.hideEvents = value.hideEvents ? false : true;
    this.setConfig(value);
  });

  public toggleGateways = () => this._config.pipe(take(1)).subscribe((value) => {
    value.hideGateways = value.hideGateways ? false : true;
    this.setConfig(value);
  });

  public editable$ = this._config.pipe(map(x => x.editable));
  public hideEvents$ = this._config.pipe(map(x => x.hideEvents));
  public hideTasks$ = this._config.pipe(map(x => x.hideTasks));
  public hideGateways$ = this._config.pipe(map(x => x.hideGateways));
  public hideSubProcesses$ = this._config.pipe(map(x => x.hideSubProcesses));
  public hideDataObjectReferences$ = this._config.pipe(map(x => x.hideDataObjectReferences));
  public hideDatabases$ = this._config.pipe(map(x => x.hideDatabases));
  public hidePools$ = this._config.pipe(map(x => x.hidePools));
  public hideGroups$ = this._config.pipe(map(x => x.hideGroups));

  public get defaultConfig(): IProcessBuilderConfig {
    return {
      'editable': true,
      'hideDataObjectReferences': false,
      'hideDatabases': false,
      'hideEvents': false,
      'hideGateways': false,
      'hideGroups': false,
      'hidePools': false,
      'hideSubProcesses': false,
      'hideTasks': false
    } as IProcessBuilderConfig;
  }

  private _reloadLocation() {
    location.reload();
  }

}
