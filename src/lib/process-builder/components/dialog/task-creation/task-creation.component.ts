import { Component, Inject, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, interval, Observable, of, Subject, Subscription } from 'rxjs';
import { IElement } from 'src/lib/bpmn-io/i-element';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js-repository';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { ITaskCreationConfig } from 'src/lib/process-builder/globals/i-task-creation-config';
import { TaskCreationStep } from 'src/lib/process-builder/globals/task-creation-step';
import { EmbeddedConfigureErrorGatewayEntranceConnectionComponent } from '../../embedded/embedded-configure-error-gateway-entrance-connection/embedded-configure-error-gateway-entrance-connection.component';
import { EmbeddedFunctionImplementationComponent } from '../../embedded/embedded-function-implementation/embedded-function-implementation.component';
import { EmbeddedFunctionSelectionComponent } from '../../embedded/embedded-function-selection/embedded-function-selection.component';
import { ITaskCreationComponentInput } from './i-task-creation-component-input';
import * as fromIFunction from 'src/lib/process-builder/store/reducers/i-function.reducer';
import * as fromIParam from 'src/lib/process-builder/store/reducers/i-param.reducer';
import { selectIFunction } from 'src/lib/process-builder/store/selectors/i-function.selector';
import { IEmbeddedFunctionImplementationData } from '../../embedded/embedded-function-implementation/i-embedded-function-implementation-output';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import { selectIParam, selectIParams } from 'src/lib/process-builder/store/selectors/i-param.selectors';
import { IParam } from 'src/lib/process-builder/globals/i-param';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { HttpClient } from '@angular/common/http';
import { EmbeddedParamEditorComponent } from '../../embedded/embedded-param-editor/embedded-param-editor.component';
import { CodemirrorRepository } from 'src/lib/core/codemirror-repository';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IProcessBuilderConfig, PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { INJECTOR_INTERFACE_TOKEN, INJECTOR_TOKEN } from 'src/lib/process-builder/globals/injector';
import { InjectorInterfacesProvider, InjectorProvider } from 'src/lib/process-builder/globals/injector-interfaces-provider';
import { IConnector } from 'src/lib/bpmn-io/i-connector';
import { EmbeddedFunctionInputSelectionComponent } from '../../embedded/embedded-function-input-selection/embedded-function-input-selection.component';
import { debounceTime, filter, map, shareReplay, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.sass'],
  providers: [
    {
      provide: INJECTOR_INTERFACE_TOKEN, useFactory: () => {
        return {
          injector: {
            'httpClient': InjectorInterfacesProvider.httpClient(),
            'httpExtensions': InjectorInterfacesProvider.httpExtensions(),
            'rxjs': InjectorInterfacesProvider.rxjs()
          }
        }
      }
    },
    {
      provide: INJECTOR_TOKEN, useFactory: (httpClient: HttpClient) => {
        return {
          'httpClient': httpClient,
          'httpExtensions': InjectorProvider.httpExtensions(),
          'rxjs': InjectorProvider.rxjs()
        }
      }, deps: [HttpClient]
    }
  ]
})
export class TaskCreationComponent implements OnDestroy, OnInit {

  @ViewChild('dynamicInner', { static: true, read: ViewContainerRef }) dynamicInner!: ViewContainerRef;

  stepRegistry: {
    type: Type<IEmbeddedView>,
    provideInputParams?: (component: IEmbeddedView, element: IElement) => void,
    autoChangeTabOnValueEmission?: boolean
  }[] = [];

  private _currentStepIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentStepIndex$ = this._currentStepIndex.asObservable();

  private _configureGateway = new BehaviorSubject<IConnector | null>(null);
  private _customImplementation = new BehaviorSubject<IElement | null>(null);
  private _hasOutputParam = new BehaviorSubject<boolean>(false);
  private _hasDynamicInputParam = new BehaviorSubject<IElement | null>(null);
  private _hasDynamicOutputParam = new BehaviorSubject<IElement | null>(null);

  hasOutputParam$ = this._hasOutputParam.asObservable();
  steps$ = combineLatest([this._configureGateway.asObservable(), this._customImplementation.asObservable(), this._hasDynamicInputParam.asObservable(), this._hasDynamicOutputParam.asObservable()])
    .pipe(
      debounceTime(10),
      map(([gatewayConfig, customImplementation, hasDynamicInputParam, dynamicOutputParam]: [IConnector | null, IElement | null, IElement | null, IElement | null]) => {
        let availableSteps: ITaskCreationConfig[] = [];
        if (gatewayConfig) {
          availableSteps.push({
            'taskCreationStep': TaskCreationStep.ConfigureErrorGatewayEntranceConnection,
            'element': gatewayConfig
          } as ITaskCreationConfig);
        }
        if (this.data.data.payload.configureActivity) {
          availableSteps.push({
            'taskCreationStep': TaskCreationStep.ConfigureFunctionSelection,
            'element': this.data.data.payload.configureActivity
          } as ITaskCreationConfig);
        }
        if (hasDynamicInputParam) {
          availableSteps.push({
            'taskCreationStep': TaskCreationStep.ConfigureFunctionInput,
            'element': hasDynamicInputParam
          } as ITaskCreationConfig);
        }
        if (customImplementation) {
          availableSteps.push({
            'taskCreationStep': TaskCreationStep.ConfigureFunctionImplementation,
            'element': customImplementation
          } as ITaskCreationConfig);
        }
        if (customImplementation || dynamicOutputParam) {
          availableSteps.push({
            'taskCreationStep': TaskCreationStep.ConfigureFunctionOutput,
            'element': dynamicOutputParam
          } as ITaskCreationConfig);
        }
        return availableSteps;
      }),
      shareReplay(1)
    ) as Observable<ITaskCreationConfig[]>;

  currentStep$ = combineLatest([this.steps$, this.currentStepIndex$]).pipe(map(([steps, index]) => steps[index]));
  canAnalyzeCustomImplementation$ = this.currentStep$.pipe(
    filter(x => x ? true : false),
    map(x => x.taskCreationStep === TaskCreationStep.ConfigureFunctionImplementation || x.taskCreationStep === TaskCreationStep.ConfigureFunctionOutput)
  );

  private _statusMessage: Subject<string> = new Subject<string>();
  statusMessage$ = combineLatest([this._statusMessage.asObservable(), this._statusMessage.pipe(switchMap(() => interval(1000)))])
    .pipe(map(([val, time]: [string, number]) => {
      return time < 5 ? val : null;
    }));

  formGroup!: FormGroup;

  private _subscriptions: Subscription[] = [];

  constructor(
    private _ref: MatDialogRef<TaskCreationComponent>,
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    @Inject(MAT_DIALOG_DATA) public data: ITaskCreationComponentInput,
    @Inject(INJECTOR_INTERFACE_TOKEN) private _injectorInterface: { injector: object },
    @Inject(INJECTOR_TOKEN) private _injector: { injector: object },
    private _funcStore: Store<fromIFunction.State>,
    private _paramStore: Store<fromIParam.State>,
    private _formBuilder: FormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      'functionIdentifier': null,
      'canFail': false,
      'implementation': null,
      'requireCustomImplementation': null,
      'name': config.defaultFunctionName,
      'normalizedName': ProcessBuilderRepository.normalizeName(config.defaultFunctionName),
      'outputParamName': config.dynamicParamDefaultNaming,
      'normalizedOutputParamName': ProcessBuilderRepository.normalizeName(config.dynamicParamDefaultNaming),
      'outputParamValue': this._formBuilder.control(null),
      'entranceGatewayType': null,
      'inputParam': null
    });
    this.formGroup.patchValue(this.data.data.data);
  }

  abort = () => this._ref.close();
  finish = () => this._ref.close(this.formGroup.value);

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
    this.stepRegistry[TaskCreationStep.ConfigureErrorGatewayEntranceConnection] = {
      type: EmbeddedConfigureErrorGatewayEntranceConnectionComponent
    };
    this.stepRegistry[TaskCreationStep.ConfigureFunctionSelection] = {
      type: EmbeddedFunctionSelectionComponent,
      provideInputParams: (arg: IEmbeddedView, element: IElement) => {
        let component = arg as EmbeddedFunctionSelectionComponent;
        component.inputParams = BPMNJsRepository.getAvailableInputParams(element);
      }
    };
    this.stepRegistry[TaskCreationStep.ConfigureFunctionImplementation] = {
      type: EmbeddedFunctionImplementationComponent
    };
    this.stepRegistry[TaskCreationStep.ConfigureFunctionOutput] = {
      type: EmbeddedParamEditorComponent
    };
    this.stepRegistry[TaskCreationStep.ConfigureFunctionInput] = {
      type: EmbeddedFunctionInputSelectionComponent,
      provideInputParams: (arg: IEmbeddedView, element: IElement) => {
        let component = arg as EmbeddedFunctionInputSelectionComponent;
        let availableInputParams = BPMNJsRepository.getAvailableInputParams(element);
        component.setInputParams(availableInputParams);
      }
    };
    this._configureGateway.next(this.data.data.payload.configureIncomingErrorGatewaySequenceFlow ?? null);
    this.validateFunctionSelection();
    this.setStep(0);

    this._subscriptions.push(...[
      this._customImplementation.subscribe((element: IElement | null) => {

      }),
      this.formGroup.controls['implementation'].valueChanges.pipe(debounceTime(2000)).subscribe(() => {
        let value = this.formGroup.controls['implementation'].value;
        let evaluationResult = CodemirrorRepository.evaluateCustomMethod(undefined, value);
        let inputs = CodemirrorRepository.getUsedInputParams(undefined, value).map(x => x.propertyName).filter((x, index, array) => array.indexOf(x) === index);
        this._hasOutputParam.next(evaluationResult === MethodEvaluationStatus.ReturnValueFound);
        this._statusMessage.next(`input params: ${inputs.length === 0 ? '-' : inputs.join(', ')}`);
      }),
      this._customImplementation
        .pipe(
          filter(x => x ? true : false),
          switchMap((element: IElement | null) => {
            let inputParams = BPMNJsRepository.getAvailableInputParams(element as IElement);
            return this._paramStore.select(selectIParams(inputParams));
          }),
          take(1),
          filter(x => x ? true : false)
        )
        .subscribe(allParams => {
          for (let param of allParams) {
            (this._injector as any)[param!.normalizedName] = ProcessBuilderRepository.convertIParamKeyValuesToPseudoObject(param!.value);
            (this._injectorInterface.injector as any)[param!.normalizedName] = ProcessBuilderRepository.convertIParamKeyValuesToPseudoObject(param!.value);
          }
        }),
      this.functionIdentifierControl.valueChanges.subscribe((functionIdentifier: number | null) => {
        if (typeof functionIdentifier !== 'number') return;
        this.validateFunctionSelection();
      })
    ]);

  }

  setStep(index: number) {
    this.steps$.pipe(take(1)).subscribe((steps: ITaskCreationConfig[]) => {
      this.dynamicInner.clear();
      this._currentStepIndex.next(index);
      if (!steps[index]) return;
      let step = steps[index];
      if (!this.stepRegistry[step.taskCreationStep]) {
        debugger;
        throw ('unregistered step');
      }
      let component = this.dynamicInner.createComponent(this.stepRegistry[step.taskCreationStep].type);
      if (typeof this.stepRegistry[step.taskCreationStep].provideInputParams === 'function') this.stepRegistry[step.taskCreationStep].provideInputParams!(component.instance, step.element);

      component.instance.formGroup = this.formGroup;
    });
  }

  testImplementation() {
    let customImplementation = this.formGroup.controls['implementation']?.value;
    if (customImplementation) {
      let result = ProcessBuilderRepository.testMethodAndGetResponse(customImplementation, this._injector);
      result.subscribe({
        'next': (result: any) => {
          let parsed: string = typeof result === 'object' ? JSON.stringify(result) : typeof result === 'number' ? result.toString() : result;
          this._statusMessage.next(`succeeded! received: ${parsed}`);
          this.formGroup.controls['outputParamValue'].setValue(ProcessBuilderRepository.extractObjectIParams(result));
        }
      });
      return;
    } else if (typeof this.functionIdentifierControl.value === 'number') {
      this._funcStore.select(selectIFunction(this.functionIdentifierControl.value))
        .pipe(take(1))
        .subscribe((func: IFunction) => {
          if (typeof func.pseudoImplementation === 'function') {
            func.pseudoImplementation()
              .then((result: object) => {
                this.formGroup.controls['outputParamValue'].setValue(ProcessBuilderRepository.extractObjectIParams(result));
              })
              .catch((reason: string) => alert(reason));
          }
        });
    }
  }

  validateFunctionSelection() {
    this._funcStore.select(selectIFunction(this.functionIdentifierControl.value)).pipe(
      take(1),
      filter(x => x ? true : false),
      switchMap((fun: IFunction | null | undefined) => combineLatest([of(fun), this._paramStore.select(selectIParam(fun?.output?.param))]))
    ).subscribe(([fun, outputParam]: [IFunction | null | undefined, IParam | null | undefined]) => {
      let inputParams = fun.useDynamicInputParams && fun.inputParams ? Array.isArray(fun.inputParams) ? [...fun.inputParams] : [fun.inputParams] : [];
      this.formGroup.patchValue({
        'canFail': fun?.canFail,
        'implementation': fun?.customImplementation,
        'requireCustomImplementation': fun?.requireCustomImplementation,
        'name': fun?.name,
        'normalizedName': fun?.normalizedName,
        'normalizedOutputParamName': outputParam?.normalizedName,
        'outputParamName': outputParam?.name,
        'outputParamValue': outputParam?.value,
        'entranceGatewayType': null,
        'inputParam': inputParams.length === 1 ? inputParams[0].param : null
      } as IEmbeddedFunctionImplementationData);
      let hasCustomImplementation = (this.requireCustomImplementationControl.value || this.implementationControl.value) && this.data.data.payload.configureActivity ? true : false;
      this._customImplementation.next(hasCustomImplementation ? this.data.data.payload.configureActivity ?? null : null);
      this._hasDynamicInputParam.next(fun?.useDynamicInputParams ?? false ? this.data.data.payload.configureActivity : null);
      this._hasDynamicOutputParam.next(fun?.output?.param === 'dynamic' ?? false ? this.data.data.payload.configureActivity : null);
    });
  }

  TaskCreationStep = TaskCreationStep;

  get functionIdentifierControl(): FormControl {
    return this.formGroup.controls['functionIdentifier'] as FormControl;
  }
  get implementationControl(): FormControl {
    return this.formGroup.controls['implementation'] as FormControl;
  }
  get requireCustomImplementationControl(): FormControl {
    return this.formGroup.controls['requireCustomImplementation'] as FormControl;
  }

  get finished() {
    return !this.unfinished;
  }
  get unfinished() {
    return false;
  }

}
