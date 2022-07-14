import { Inject, Injectable, Injector } from '@angular/core';

import BPMNJSModules from 'src/lib/bpmn-io/bpmn-js-modules';

// @ts-ignore
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

// @ts-ignore
import gridModule from "diagram-js/lib/features/grid-snapping/visuals";

// @ts-ignore
import CliModule from 'bpmn-js-cli';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { BehaviorSubject, combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromIParamState from '../../store/reducers/i-param.reducer';
import * as fromIFuncState from '../../store/reducers/i-function.reducer';
import * as fromIBpmnJSModelState from '../../store/reducers/i-bpmn-js-model.reducer';

import { selectIParams } from '../../store/selectors/i-param.selectors';
import { validateBPMNConfig } from 'src/lib/core/config-validator';
import { selectIFunctions } from '../../store/selectors/i-function.selector';
import { IBpmnJS } from '../../globals/i-bpmn-js';
import { addIBpmnJSModel, removeIBpmnJSModel, updateIBpmnJSModel, upsertIBpmnJSModel } from '../../store/actions/i-bpmn-js-model.actions';
import * as moment from 'moment';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { Guid } from '../../globals/guid';
import { selectIBpmnJSModels, selectRecentlyUsedIBpmnJSModel } from '../../store/selectors/i-bpmn-js-model.selectors';
import { IBpmnJSModel } from '../../globals/i-bpmn-js-model';
import sebleichProcessBuilderExtension from '../../globals/sebleich-process-builder-extension';
import { getCanvasModule, getEventBusModule, getTooltipModule } from 'src/lib/bpmn-io/bpmn-modules';
import { IViewbox } from 'src/lib/bpmn-io/i-viewbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { processPerformer } from 'src/lib/core/process-performer';
import bpmnJsEventTypes from 'src/lib/bpmn-io/bpmn-js-event-types';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js-repository';

// @ts-ignore
import * as tooltips from "diagram-js/lib/features/tooltips";
import { IElement } from 'src/lib/bpmn-io/i-element';
import { ValidationErrorPipe } from '../../pipes/validation-error.pipe';
import { IProcessValidationResult } from '../../classes/validation-result';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { debounceTime, delay, distinctUntilChanged, map, shareReplay, switchMap, take, throttleTime } from 'rxjs/operators';
import { IFunction } from '../../globals/i-function';
import { removeIFunction, updateIFunction } from '../../store/actions/i-function.actions';
import { IParam } from '../../globals/i-param';
import { removeIParam } from '../../store/actions/i-param.actions';
import { ValidationError } from '../../globals/validation-error';
import { ValidationWarning } from '../../globals/validation-warning';
import { ValidationWarningPipe } from '../../pipes/validation-warning.pipe';

@Injectable()
export class ProcessBuilderComponentService {

  private _currentIBpmnJSModelGuid = new BehaviorSubject<string | null>(null);
  private _modelChanged = new Subject<void>();
  private _pendingChanges = new BehaviorSubject<boolean>(false);

  // instantiate BpmnJS with component
  public bpmnJS!: IBpmnJS;

  public params$ = this._paramStore.select(selectIParams());
  public funcs$ = this._funcStore.select(selectIFunctions());
  public models$: Observable<IBpmnJSModel[]> = this._bpmnJSModelStore.select(selectIBpmnJSModels());
  public pendingChanges$ = this._pendingChanges.asObservable();
  public noPendingChanges$ = this.pendingChanges$.pipe(map(x => !x));
  public currentIBpmnJSModelGuid$ = this._currentIBpmnJSModelGuid.pipe(distinctUntilChanged());
  public currentIBpmnJSModel$ = combineLatest(
    [
      this._bpmnJSModelStore.select(selectIBpmnJSModels()),
      this.currentIBpmnJSModelGuid$
    ]
  ).pipe(
    debounceTime(10),
    map(([bpmnJSModels, bpmnJSModelGuid]: [IBpmnJSModel[], string | null]) => bpmnJSModels.find(x => x.guid === bpmnJSModelGuid))
  );
  public validation$: Observable<undefined | null | IProcessValidationResult> = this._modelChanged.pipe(
    throttleTime(500),
    map(() => BPMNJsRepository.validateProcess(this.bpmnJS)),
    shareReplay(1)
  );

  private _subscriptions: Subscription[] = [];

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) private _config: IProcessBuilderConfig,
    private _snackBar: MatSnackBar,
    private _injector: Injector,
    private _paramStore: Store<fromIParamState.State>,
    private _funcStore: Store<fromIFuncState.State>,
    private _bpmnJSModelStore: Store<fromIBpmnJSModelState.State>,
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
            'guid': Guid.generateGuid(),
            'created': moment().format('yyyy-MM-ddTHH:mm:ss'),
            'description': null,
            'name': this._config.defaultBpmnModelName,
            'xml': xml,
            'lastModified': moment().format('yyyy-MM-ddTHH:mm:ss')
          };
          console.log(defaultBpmnModel);
          this._bpmnJSModelStore.dispatch(addIBpmnJSModel(defaultBpmnModel));
          this._currentIBpmnJSModelGuid.next(defaultBpmnModel.guid);
        }
      });
  }

  dispose() {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  hideAllHints = () => ProcessBuilderRepository.clearAllTooltips(this.bpmnJS);

  init(parent: HTMLDivElement) {
    // attach BpmnJS instance to DOM element
    this.bpmnJS.attachTo(parent);
    this.setDefaultModel().subscribe();
  }

  removeModel(bpmnJsModel?: IBpmnJSModel, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    let callback = (model: IBpmnJSModel | string) => {
      this._bpmnJSModelStore.dispatch(removeIBpmnJSModel(model));
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
    this._funcStore.dispatch(removeIFunction(func));
  }

  removeParameter(param: IParam) {
    this._funcStore.dispatch(removeIParam(param));
  }

  renameCurrentModel(name: string) {
    this.currentIBpmnJSModel$.pipe(take(1))
      .subscribe(model => {
        if (!model) return;
        let copy = { ...model };
        copy.name = name;
        this._bpmnJSModelStore.dispatch(updateIBpmnJSModel(copy));
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
      this.bpmnJS.saveXML()
        .then(({ xml }) => {

          if (!model) return;

          this._bpmnJSModelStore.dispatch(upsertIBpmnJSModel({
            'guid': model.guid,
            'created': model.created,
            'description': model.description,
            'name': model.name,
            'xml': xml,
            'lastModified': moment().format('yyyy-MM-ddTHH:mm:ss'),
            'viewbox': getCanvasModule(this.bpmnJS).viewbox()
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

    this._bpmnJSModelStore.select(selectRecentlyUsedIBpmnJSModel())
      .pipe(
        switchMap((model: IBpmnJSModel | undefined) => model ? of(model) : this._processBuilderService.defaultBPMNModel$),
        take(1)
      )
      .subscribe({
        next: (model: IBpmnJSModel | string) => {

          if (typeof model === 'string') {
            model = {
              'guid': Guid.generateGuid(),
              'created': moment().format('yyyy-MM-ddTHH:mm:ss'),
              'description': null,
              'name': this._config.defaultBpmnModelName,
              'xml': model,
              'lastModified': moment().format('yyyy-MM-ddTHH:mm:ss')
            };
            this._bpmnJSModelStore.dispatch(addIBpmnJSModel(model));
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
      this._bpmnJSModelStore.select(selectIBpmnJSModels()),
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

  showError(error: { element: IElement, error: ValidationError }) {
    this.hideAllHints();
    var tooltipModule = getTooltipModule(this.bpmnJS);
    tooltipModule.add({
      position: {
        x: error.element.x,
        y: error.element.y + error.element.height + 3
      },
      html:
        `<div style="width: 120px; background: #f44336de; color: white; font-size: .7rem; padding: .2rem .3rem; border-radius: 2px; line-height: .8rem;">${new ValidationErrorPipe().transform(error.error)}</div>`
    });
  }

  showWarning(warning: { element: IElement, warning: ValidationWarning }) {
    console.log(warning);
    this.hideAllHints();
    var tooltipModule = getTooltipModule(this.bpmnJS);
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
      processPerformer(this.bpmnJS);
    } catch (error) {
      console.log(error);
    }

  }

  updateIBpmnJSModel(model: IBpmnJSModel) {
    this._bpmnJSModelStore.dispatch(updateIBpmnJSModel(model));
  }

  updateIFunction(func: IFunction) {
    this._bpmnJSModelStore.dispatch(updateIFunction(func));
  }

  undo = () => (window as any).cli.undo();
  redo = () => (window as any).cli.redo();


  private _setBpmnModel(xml: string, viewbox: IViewbox | null = null) {
    this.bpmnJS.importXML(xml)
      .then(() => {
        if (viewbox) getCanvasModule(this.bpmnJS).viewbox(viewbox);
      })
      .catch((err) => console.log('error rendering', err));
  }

  private _setUp() {

    this.bpmnJS = new BpmnJS({
      additionalModules: [gridModule, CliModule, tooltips],
      cli: {
        bindTo: 'cli'
      },
      moddleExtensions: {
        processBuilderExtension: sebleichProcessBuilderExtension
      }
    });

    this._subscriptions.push(...[
      this.currentIBpmnJSModel$.subscribe((model: IBpmnJSModel | undefined) => {
        if (!model) return;
        this._setBpmnModel(model.xml, model.viewbox);
      }),
      validateBPMNConfig(this.bpmnJS, this._injector).subscribe(() => {
        console.log('YET');
        this._modelChanged.next();
        this._pendingChanges.next(true);
      })
    ]);

    getEventBusModule(this.bpmnJS).on(bpmnJsEventTypes.ElementChanged, () => this._modelChanged.next());

    let prevSub: Subscription | undefined;
    getEventBusModule(this.bpmnJS).on(bpmnJsEventTypes.ElementHover, (evt) => {

      ProcessBuilderRepository.clearAllTooltips(this.bpmnJS);

      var tooltipModule = getTooltipModule(this.bpmnJS);

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
