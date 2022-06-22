import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../globals/i-process-builder-config';

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

  private _config = new ReplaySubject<IProcessBuilderConfig>(1);

  constructor(
    @Optional() @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private config: IProcessBuilderConfig,
    private _httpClient: HttpClient
  ) {
    if (!config) config = this.defaultConfig;
    this._config.next(config);
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
