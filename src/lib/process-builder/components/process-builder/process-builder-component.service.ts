import { Inject, Injectable, Injector } from '@angular/core';

import { v4 as generateGuid } from 'uuid';

import { ProcessBuilderService } from '../../services/process-builder.service';
import { BehaviorSubject, combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectIParams } from '../../store/selectors/i-param.selectors';
import { validateBPMNConfig } from 'src/lib/core/config-validator';
import { selectIFunctions, selectIFunctionsByOutputParam } from '../../store/selectors/i-function.selector';
import { addIBpmnJSModel, removeIBpmnJSModel, updateIBpmnJSModel, upsertIBpmnJSModel } from '../../store/actions/i-bpmn-js-model.actions';
import * as moment from 'moment';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { selectIBpmnJSModels, selectRecentlyUsedIBpmnJSModel } from '../../store/selectors/i-bpmn-js-model.selectors';
import { IBpmnJSModel } from '../../globals/i-bpmn-js-model';
import { getCanvasModule, getEventBusModule, getTooltipModule } from 'src/lib/bpmn-io/bpmn-modules';
import { IViewbox } from 'src/lib/bpmn-io/i-viewbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { processPerformer } from 'src/lib/core/process-performer';
import bpmnJsEventTypes from 'src/lib/bpmn-io/bpmn-js-event-types';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js-repository';

import { IElement } from 'src/lib/bpmn-io/i-element';
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
import { BpmnjsService } from '../../services/bpmnjs.service';

@Injectable()
export class ProcessBuilderComponentService {

  private _currentIBpmnJSModelGuid = new BehaviorSubject<string | null>(null);
  private _modelChanged = new Subject<void>();
  private _pendingChanges = new BehaviorSubject<boolean>(false);

  public params$ = this._store.select(selectIParams());
  public funcs$ = this._store.select(selectIFunctions());
  public models$: Observable<IBpmnJSModel[]> = this._store.select(selectIBpmnJSModels());
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
  public validation$: Observable<undefined | null | IProcessValidationResult> = this._modelChanged.pipe(
    throttleTime(500),
    map(() => BPMNJsRepository.validateProcess(this.bpmnjsService.bpmnjs)),
    shareReplay(1)
  );

  private _subscriptions: Subscription[] = [];

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig,
    private bpmnjsService: BpmnjsService,
    private _snackBar: MatSnackBar,
    private _injector: Injector,
    private _store: Store,
    private _processBuilderService: ProcessBuilderService
  ) {
    this._setUp();
  }

  createModel() {
    this._processBuilderService.defaultBPMNModel$
      .pipe(take(1))
      .subscribe({
        next: (xml: string) => {
          let defaultBpmnModel = {
            'guid': generateGuid(),
            'created': moment().format('yyyy-MM-ddTHH:mm:ss'),
            'description': null,
            'name': this._config.defaultBpmnModelName,
            'xml': xml,
            'lastModified': moment().format('yyyy-MM-ddTHH:mm:ss')
          };
          console.log(defaultBpmnModel);
          this._store.dispatch(addIBpmnJSModel(defaultBpmnModel));
          this._currentIBpmnJSModelGuid.next(defaultBpmnModel.guid);
        }
      });
  }

  dispose() {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  hideAllHints = () => BPMNJsRepository.clearAllTooltips(this.bpmnjsService.bpmnjs);

  init(parent: HTMLDivElement) {
    // attach BpmnJS instance to DOM element
    this.bpmnjsService.bpmnjs.attachTo(parent);
    this.setDefaultModel().subscribe();
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
      this.bpmnjsService.bpmnjs.saveXML().then(({ xml }: { xml: any }) => {

        if (!model) return;

        this._store.dispatch(upsertIBpmnJSModel({
          'guid': model.guid,
          'created': model.created,
          'description': model.description,
          'name': model.name,
          'xml': xml,
          'lastModified': moment().format('yyyy-MM-ddTHH:mm:ss'),
          'viewbox': getCanvasModule(this.bpmnjsService.bpmnjs).viewbox()
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
        switchMap((model: IBpmnJSModel | undefined) => model ? of(model) : this._processBuilderService.defaultBPMNModel$),
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
          this._currentIBpmnJSModelGuid.next(model.guid);
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

  showError(error: { element?: IElement, error: ValidationError }) {
    this.hideAllHints();
    if (!error.element) {
      return;
    }

    var tooltipModule = getTooltipModule(this.bpmnjsService.bpmnjs);
    tooltipModule.add({
      position: {
        x: error.element.x,
        y: error.element.y + error.element.height + 3
      },
      html:
        `<div style="width: 120px; background: #f44336de; color: white; font-size: .7rem; padding: .2rem .3rem; border-radius: 2px; line-height: .8rem;">${new ValidationErrorPipe().transform(error.error)}</div>`
    });
  }

  showWarning(warning: { element?: IElement, warning: ValidationWarning }) {
    this.hideAllHints();
    if (!warning.element) {
      return;
    }

    var tooltipModule = getTooltipModule(this.bpmnjsService.bpmnjs);
    tooltipModule.add({
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
      processPerformer(this.bpmnjsService.bpmnjs);
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

  undo = () => (window as any).cli.undo();
  redo = () => (window as any).cli.redo();
  zoomIn = () => this.bpmnjsService.bpmnjs.get('zoomScroll').stepZoom(1);
  zoomOut = () => this.bpmnjsService.bpmnjs.get('zoomScroll').stepZoom(-1);


  private _setBpmnModel(xml: string, viewbox: IViewbox | null = null) {
    this.bpmnjsService.bpmnjs.importXML(xml)
      .then(() => {
        if (viewbox) getCanvasModule(this.bpmnjsService.bpmnjs).viewbox(viewbox);
      })
      .catch((err: any) => console.log('error rendering', err));
  }

  private _setUp() {

    // this.bpmnJS = new BpmnJS({
    //   additionalModules: [
    //     customRendererModule,
    //     gridModule,
    //     CliModule,
    //     tooltips
    //   ],
    //   cli: {
    //     bindTo: 'cli'
    //   },
    //   moddleExtensions: {
    //     processBuilderExtension: sebleichProcessBuilderExtension
    //   }
    // });

    this._subscriptions.push(...[
      this.currentIBpmnJSModel$.subscribe((model: IBpmnJSModel | undefined) => {
        if (!model) return;
        this._setBpmnModel(model.xml, model.viewbox);
      }),
      validateBPMNConfig(this.bpmnjsService.bpmnjs, this._injector).subscribe(() => {
        this._modelChanged.next();
        this._pendingChanges.next(true);
      })
    ]);

    getEventBusModule(this.bpmnjsService.bpmnjs).on(bpmnJsEventTypes.ElementChanged, () => this._modelChanged.next());

    let prevSub: Subscription | undefined;
    getEventBusModule(this.bpmnjsService.bpmnjs).on(bpmnJsEventTypes.ElementHover, (evt) => {

      BPMNJsRepository.clearAllTooltips(this.bpmnjsService.bpmnjs);

      var tooltipModule = getTooltipModule(this.bpmnjsService.bpmnjs);

      if (prevSub) {
        prevSub.unsubscribe();
        prevSub = undefined;
      }

      prevSub = this.validation$.subscribe((validation) => {

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
