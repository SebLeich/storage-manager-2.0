import { Inject, Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IFunction } from '../globals/i-function';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../globals/i-process-builder-config';
import { Store } from '@ngrx/store';
import { removeIFunction } from '../store/actions/i-function.actions';
import { selectIFunctionsByOutputParam } from '../store/selectors/i-function.selector';
import { removeIParam } from '../store/actions/i-param.actions';
import { selectCurrentParamOutput } from '../store/selectors/i-param.selectors';

@Injectable()
export class ProcessBuilderService {

  public currentProcessOutput$ = this._store.select(selectCurrentParamOutput);

  private _config = new ReplaySubject<IProcessBuilderConfig>(1);

  constructor(
    @Optional() @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private config: IProcessBuilderConfig,
    private _store: Store
  ) {
    if (!this.config) {
      config = this.defaultConfig;
    }
    this._config.next(config);
  }

  public setConfig(arg: any) {
    this._config.next(arg);
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

}
