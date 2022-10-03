import { Inject, Injectable, Injector } from '@angular/core';

import { v4 as generateGuid } from 'uuid';

import { BehaviorSubject, combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectIParams } from '../../store/selectors/i-param.selectors';
import { validateBPMNConfig } from 'src/lib/core/config-validator';
import { selectIFunctions, selectIFunctionsByOutputParam } from '../../store/selectors/i-function.selector';
import { addIBpmnJSModel, createIBpmnJsModel, removeIBpmnJSModel, setCurrentIBpmnJSModel, updateIBpmnJSModel, upsertIBpmnJSModel } from '../../store/actions/i-bpmn-js-model.actions';
import * as moment from 'moment';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { selectIBpmnJSModels, selectRecentlyUsedIBpmnJSModel } from '../../store/selectors/i-bpmn-js-model.selectors';
import { IBpmnJSModel } from '../../interfaces/i-bpmn-js-model.interface';
import { getCanvasModule, getEventBusModule, getTooltipModule } from 'src/lib/bpmn-io/bpmn-modules';
import { IViewbox } from 'src/lib/bpmn-io/interfaces/i-viewbox.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { processPerformer } from 'src/lib/core/process-performer';
import bpmnJsEventTypes from 'src/lib/bpmn-io/bpmn-js-event-types';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';

import { IElement } from 'src/lib/bpmn-io/interfaces/i-element.interface';
import { ValidationErrorPipe } from '../../pipes/validation-error.pipe';
import { IProcessValidationResult } from '../../classes/validation-result';
import { debounceTime, distinctUntilChanged, map, shareReplay, switchMap, take, throttleTime } from 'rxjs/operators';
import { IFunction } from '../../globals/i-function';
import { removeIFunction, updateIFunction } from '../../store/actions/i-function.actions';
import { IParam } from '../../globals/i-param';
import { removeIParam } from '../../store/actions/i-param.actions';
import { ValidationError } from '../../globals/validation-error';
import { ValidationWarning } from '../../globals/validation-warning';
import { ValidationWarningPipe } from '../../pipes/validation-warning.pipe';
import { BpmnJsService } from '../../services/bpmnjs.service';
import { selectSnapshot } from '../../globals/select-snapshot';
import defaultBpmnXmlConstant from '../../globals/default-bpmn-xml.constant';

@Injectable()
export class ProcessBuilderComponentService {

  private _currentIBpmnJSModelGuid = new BehaviorSubject<string | null>(null);
  private _modelChanged = new Subject<void>();
  private _pendingChanges = new BehaviorSubject<boolean>(false);

  public params$ = this._store.select(selectIParams());
  public funcs$ = this._store.select(selectIFunctions());
  public models$ = this._store.select(selectIBpmnJSModels());
  public pendingChanges$ = this._pendingChanges.asObservable();
  public noPendingChanges$ = this.pendingChanges$.pipe(map(x => !x));
  public currentIBpmnJSModelGuid$ = this._currentIBpmnJSModelGuid.pipe(distinctUntilChanged());
  public currentIBpmnJSModel$ = combineLatest(
    [
      this._store.select(selectIBpmnJSModels()),
      this.currentIBpmnJSModelGuid$
    ]
  ).pipe(
    debounceTime(10),
    map(([bpmnJSModels, bpmnJSModelGuid]: [IBpmnJSModel[], string | null]) => bpmnJSModels.find(x => x.guid === bpmnJSModelGuid))
  );

  private _subscriptions = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig,
    private bpmnjsService: BpmnJsService,
    private _snackBar: MatSnackBar,
    private _injector: Injector,
    private _store: Store
  ) {
    this._setUp();
  }

  public createModel() {
    this._store.dispatch(createIBpmnJsModel());
  }

  public dispose() {
    this._subscriptions.unsubscribe();
  }

  hideAllHints = () => BPMNJsRepository.clearAllTooltips(this.bpmnjsService.bpmnJs);

  async init(parent: HTMLDivElement) {
    this.bpmnjsService.bpmnJs.attachTo(parent);
    await selectSnapshot(this.setDefaultModel());
  }

  removeModel(bpmnJsModel?: IBpmnJSModel, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    let callback = (model: IBpmnJSModel | string) => {
      this._store.dispatch(removeIBpmnJSModel(model));
      this.setDefaultModel();
    }
    if (bpmnJsModel) callback(bpmnJsModel);
    else {
      this._currentIBpmnJSModelGuid.pipe(take(1)).subscribe((bpmnJSModelGuid: string | null) => {
        if (typeof bpmnJSModelGuid !== 'string') return;
        callback(bpmnJSModelGuid);
      });
    }
  }

  removeFunction(func: IFunction) {
    this._store.dispatch(removeIFunction(func));
    if (typeof func.output?.param !== 'number') return;

    this._store.select(selectIFunctionsByOutputParam(func.output.param))
      .pipe(take(1))
      .subscribe(arg => {
        if (arg.length === 1 && arg[0].identifier === func.identifier) this._store.dispatch(removeIParam(func.output!.param as number));
      });
  }

  removeParameter(param: IParam) {
    this._store.dispatch(removeIParam(param));
  }

  renameCurrentModel(name: string) {
    this.currentIBpmnJSModel$.pipe(take(1))
      .subscribe(model => {
        if (!model) return;
        let copy = { ...model };
        copy.name = name;
        this._store.dispatch(updateIBpmnJSModel(copy));
      });
  }

  resetAll() {
    localStorage.removeItem('params');
    localStorage.removeItem('funcs');
    localStorage.removeItem('models');
    location.reload();
  }

  saveModel() {
    this.currentIBpmnJSModel$.pipe(take(1)).subscribe((model: IBpmnJSModel | undefined) => {
      this.bpmnjsService.bpmnJs.saveXML().then(({ xml }: { xml: any }) => {

        if (!model) return;

        this._store.dispatch(upsertIBpmnJSModel({
          'guid': model.guid,
          'created': model.created,
          'description': model.description,
          'name': model.name,
          'xml': xml,
          'lastModified': moment().format('yyyy-MM-ddTHH:mm:ss'),
          'viewbox': getCanvasModule(this.bpmnjsService.bpmnJs).viewbox()
        }));

        this._snackBar.open(`the state was successfully saved`, 'Ok', {
          duration: 2000
        });
        this._pendingChanges.next(false);

      });
    })
  }

  setDefaultModel(): Observable<void> {
    let subject = new Subject<void>();

    this._store.select(selectRecentlyUsedIBpmnJSModel())
      .pipe(
        map((model: IBpmnJSModel | undefined) => model ? model : defaultBpmnXmlConstant),
        take(1)
      )
      .subscribe({
        next: (model: IBpmnJSModel | string) => {
          if (typeof model === 'string') {
            model = {
              'guid': generateGuid(),
              'created': moment().format('yyyy-MM-ddTHH:mm:ss'),
              'description': null,
              'name': this._config.defaultBpmnModelName,
              'xml': model,
              'lastModified': moment().format('yyyy-MM-ddTHH:mm:ss')
            };
            this._store.dispatch(addIBpmnJSModel(model));
          }
          this._store.dispatch(setCurrentIBpmnJSModel(model.guid));
          subject.next();
        },
        complete: () => subject.complete()
      });

    return subject.asObservable();
  }

  setModel = (arg: string | IBpmnJSModel) => this._currentIBpmnJSModelGuid.next(typeof arg === 'string' ? arg : arg.guid);

  setNextModel() {
    combineLatest([
      this._store.select(selectIBpmnJSModels()),
      this._currentIBpmnJSModelGuid.asObservable()
    ]).pipe(
      take(1)
    ).subscribe(([models, modelGuid]: [IBpmnJSModel[], string | null]) => {
      if (models.length < 2 || typeof modelGuid !== 'string') return;
      let index = models.findIndex(x => x.guid === modelGuid);
      index = index >= (models.length - 1) ? 0 : index + 1;
      this._currentIBpmnJSModelGuid.next(models[index].guid);
    });
  }

  public showError(error: { element?: IElement, error: ValidationError }) {
    this.hideAllHints();
    if (!error.element) {
      return;
    }

    this.bpmnjsService.tooltipModule.add({
      position: {
        x: error.element.x,
        y: error.element.y + error.element.height + 3
      },
      html:
        `<div style="width: 120px; background: #f44336de; color: white; font-size: .7rem; padding: .2rem .3rem; border-radius: 2px; line-height: .8rem;">${new ValidationErrorPipe().transform(error.error)}</div>`
    });
  }

  public showWarning(warning: { element?: IElement, warning: ValidationWarning }) {
    this.hideAllHints();
    if (!warning.element) {
      return;
    }

    this.bpmnjsService.tooltipModule.add({
      position: {
        x: warning.element?.x,
        y: warning.element?.y + warning.element?.height + 3
      },
      html:
        `<div style="width: 120px; background: #ffb200; color: white; font-size: .7rem; padding: .2rem .3rem; border-radius: 2px; line-height: .8rem;">${new ValidationWarningPipe().transform(warning.warning)}</div>`
    });
  }

  tryExecute() {

    try {
      processPerformer(this.bpmnjsService.bpmnJs);
    } catch (error) {
      console.log(error);
    }

  }

  updateIBpmnJSModel(model: IBpmnJSModel) {
    this._store.dispatch(updateIBpmnJSModel(model));
  }

  updateIFunction(func: IFunction) {
    this._store.dispatch(updateIFunction(func));
  }

  public undo = () => (window as any).cli.undo();
  public redo = () => (window as any).cli.redo();
  public zoomIn = () => this.bpmnjsService.bpmnJs.get('zoomScroll').stepZoom(1);
  public zoomOut = () => this.bpmnjsService.bpmnJs.get('zoomScroll').stepZoom(-1);


  private _setBpmnModel(xml: string, viewbox: IViewbox | null = null) {
    this.bpmnjsService.bpmnJs.importXML(xml)
      .then(() => {
        if (viewbox) {
          getCanvasModule(this.bpmnjsService.bpmnJs).viewbox(viewbox);
        }
      })
      .catch((err: any) => console.log('error rendering', err));
  }

  private _setUp() {
    this._subscriptions.add(...[
      this.currentIBpmnJSModel$.subscribe((model: IBpmnJSModel | undefined) => {
        if (!model) return;
        this._setBpmnModel(model.xml, model.viewbox);
      }),
      validateBPMNConfig(this.bpmnjsService.bpmnJs, this._injector).subscribe(() => {
        this._modelChanged.next();
        this._pendingChanges.next(true);
      })
    ]);

    getEventBusModule(this.bpmnjsService.bpmnJs).on(bpmnJsEventTypes.ElementChanged, () => this._modelChanged.next());

    let prevSub: Subscription | undefined;
    getEventBusModule(this.bpmnjsService.bpmnJs).on(bpmnJsEventTypes.ElementHover, (evt) => {

      BPMNJsRepository.clearAllTooltips(this.bpmnjsService.bpmnJs);

      var tooltipModule = getTooltipModule(this.bpmnjsService.bpmnJs);

      if (prevSub) {
        prevSub.unsubscribe();
        prevSub = undefined;
      }

      prevSub = this.bpmnjsService.validation$.subscribe((validation) => {

        if (!validation) return;

        let errors = validation.errors.filter(x => x.element === evt.element);

        if (errors.length > 0) {
          tooltipModule.add({
            position: {
              x: (evt.element as IElement).x,
              y: (evt.element as IElement).y + (evt.element as IElement).height + 3
            },
            html:
              `<div style="width: 120px; background: #f44336de; color: white; font-size: .7rem; padding: .2rem .3rem; border-radius: 2px; line-height: .8rem;">${errors.map((x, index) => `${index + 1}: ${new ValidationErrorPipe().transform(x.error)}`).join('<br>')}</div>`
          });
        }

      });
    });

  }

}
