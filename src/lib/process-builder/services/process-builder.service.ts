import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { IFunction } from '../globals/i-function';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../globals/i-process-builder-config';
import { Store } from '@ngrx/store';
import { removeIFunction } from '../store/actions/i-function.actions';
import { selectIFunctionsByOutputParam } from '../store/selectors/i-function.selector';

import * as fromIFunction from 'src/lib/process-builder/store/reducers/i-function.reducer';
import * as fromIParam from 'src/lib/process-builder/store/reducers/i-param.reducer';
import { removeIParam } from '../store/actions/i-param.actions';
import { selectCurrentParamOutput } from '../store/selectors/i-param.selectors';

@Injectable({
  providedIn: 'root'
})
export class ProcessBuilderService {

  defaultBPMNModel$ = this._httpClient.get('./assets/default-bpmn.xml', {
    headers: new HttpHeaders().set('Content-Type', 'text/xml'),
    responseType: 'text'
  }).pipe(
    shareReplay(1)
  );
  currentProcessOutput$ = this._paramStore.select(selectCurrentParamOutput);

  private _config = new ReplaySubject<IProcessBuilderConfig>(1);

  constructor(
    @Optional() @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private config: IProcessBuilderConfig,
    private _httpClient: HttpClient,
    private _funcStore: Store<fromIFunction.State>,
    private _paramStore: Store<fromIParam.State>,
  ) {    
    if (!config) config = this.defaultConfig;
    this._config.next(config);
  }

  removeFunction(func: IFunction) {
    this._funcStore.dispatch(removeIFunction(func));
    if (typeof func.output?.param !== 'number') return;

    this._funcStore.select(selectIFunctionsByOutputParam(func.output.param))
      .pipe(take(1))
      .subscribe(arg => {
        if (arg.length === 1 && arg[0].identifier === func.identifier) this._paramStore.dispatch(removeIParam(func.output!.param as number));
      });
  }

  setConfig = (arg: any) => this._config.next(arg);

  toggleEvents = () => this._config.pipe(take(1)).subscribe((value) => {
    value.hideEvents = value.hideEvents ? false : true;
    this.setConfig(value);
  });

  toggleGateways = () => this._config.pipe(take(1)).subscribe((value) => {
    value.hideGateways = value.hideGateways ? false : true;
    this.setConfig(value);
  });

  // domain settings
  editable$ = this._config.pipe(map(x => x.editable));
  hideEvents$ = this._config.pipe(map(x => x.hideEvents));
  hideTasks$ = this._config.pipe(map(x => x.hideTasks));
  hideGateways$ = this._config.pipe(map(x => x.hideGateways));
  hideSubProcesses$ = this._config.pipe(map(x => x.hideSubProcesses));
  hideDataObjectReferences$ = this._config.pipe(map(x => x.hideDataObjectReferences));
  hideDatabases$ = this._config.pipe(map(x => x.hideDatabases));
  hidePools$ = this._config.pipe(map(x => x.hidePools));
  hideGroups$ = this._config.pipe(map(x => x.hideGroups));

  get defaultConfig(): IProcessBuilderConfig {
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
