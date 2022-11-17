import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  combineLatest,
  interval,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { IEmbeddedView } from 'src/lib/process-builder/globals/i-embedded-view';
import { ITaskCreationConfig } from 'src/lib/process-builder/interfaces/i-task-creation-config.interface';
import { TaskCreationStep } from 'src/lib/process-builder/globals/task-creation-step';
import { EmbeddedConfigureErrorGatewayEntranceConnectionComponent } from '../../embedded/embedded-configure-error-gateway-entrance-connection/embedded-configure-error-gateway-entrance-connection.component';
import { EmbeddedFunctionImplementationComponent } from '../../embedded/embedded-function-implementation/embedded-function-implementation.component';
import { EmbeddedFunctionSelectionComponent } from '../../embedded/embedded-function-selection/embedded-function-selection.component';
import { ITaskCreationComponentInput } from '../../../interfaces/i-task-creation-component-input.interface';

import { selectIFunction } from 'src/lib/process-builder/store/selectors/i-function.selector';
import { IEmbeddedFunctionImplementationData } from '../../../interfaces/i-embedded-function-implementation-output.interface';
import { IFunction } from 'src/lib/process-builder/globals/i-function';
import {
  selectIParam,
  selectIParams,
} from 'src/lib/process-builder/store/selectors/i-param.selectors';
import { IParam } from 'src/lib/process-builder/globals/i-param';
import { ProcessBuilderRepository } from 'src/lib/core/process-builder-repository';
import { HttpClient } from '@angular/common/http';
import { EmbeddedParamEditorComponent } from '../../embedded/embedded-param-editor/embedded-param-editor.component';
import { CodemirrorRepository } from 'src/lib/core/codemirror-repository';
import { MethodEvaluationStatus } from 'src/lib/process-builder/globals/method-evaluation-status';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {
  IProcessBuilderConfig,
  PROCESS_BUILDER_CONFIG_TOKEN,
} from 'src/lib/process-builder/globals/i-process-builder-config';
import {
  INJECTOR_INTERFACE_TOKEN,
  INJECTOR_TOKEN,
} from 'src/lib/process-builder/globals/injector';
import {
  InjectorInterfacesProvider,
  InjectorProvider,
} from 'src/lib/process-builder/globals/injector-interfaces-provider';
import { IConnector } from 'src/lib/bpmn-io/interfaces/connector.interface';
import { EmbeddedFunctionInputSelectionComponent } from '../../embedded/embedded-function-input-selection/embedded-function-input-selection.component';
import {
  debounceTime,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
} from 'rxjs/operators';
import { EmbeddedInputOutputMappingComponent } from '../../embedded/embedded-input-output-mapping/embedded-input-output-mapping.component';
import { selectIInterface } from 'src/lib/process-builder/store/selectors/i-interface.selectors';
import { IInterface } from 'src/lib/process-builder/interfaces/i-interface.interface';
import { mapIParamsInterfaces } from 'src/lib/process-builder/extensions/rxjs/map-i-params-interfaces.rxjs-extension';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.sass'],
  providers: [
    {
      provide: INJECTOR_INTERFACE_TOKEN,
      useFactory: () => {
        return {
          injector: {
            httpClient: InjectorInterfacesProvider.httpClient(),
            httpExtensions: InjectorInterfacesProvider.httpExtensions(),
            rxjs: InjectorInterfacesProvider.rxjs(),
          },
        };
      },
    },
    {
      provide: INJECTOR_TOKEN,
      useFactory: (httpClient: HttpClient) => {
        return {
          httpClient: httpClient,
          httpExtensions: InjectorProvider.httpExtensions(),
          rxjs: InjectorProvider.rxjs(),
        };
      },
      deps: [HttpClient],
    },
  ],
})
export class TaskCreationComponent implements OnDestroy, OnInit {
  @ViewChild('dynamicInner', { static: true, read: ViewContainerRef })
  private dynamicInner!: ViewContainerRef;

  public stepRegistry: {
    type: Type<IEmbeddedView>;
    provideInputParams?: (component: IEmbeddedView, element: IElement) => void;
    autoChangeTabOnValueEmission?: boolean;
  }[] = [];

  private _currentStepIndex: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);
  public currentStepIndex$ = this._currentStepIndex.asObservable();

  private _configureGateway = new BehaviorSubject<IConnector | null>(null);
  private _customImplementation = new BehaviorSubject<IElement | null>(null);
  private _hasOutputParam = new BehaviorSubject<boolean>(false);
  private _hasDynamicInputParam = new BehaviorSubject<
    IElement | null | undefined
  >(null);
  private _hasDynamicOutputParam = new BehaviorSubject<
    IElement | null | undefined
  >(null);
  private _hasDataMapping = new BehaviorSubject<IElement | null | undefined>(
    null
  );

  public hasOutputParam$ = this._hasOutputParam.asObservable();
  public steps$ = combineLatest([
    this._configureGateway.asObservable(),
    this._customImplementation.asObservable(),
    this._hasDynamicInputParam.asObservable(),
    this._hasDynamicOutputParam.asObservable(),
    this._hasDataMapping.asObservable(),
  ]).pipe(
    map(
      ([
        gatewayConfig,
        customImplementation,
        hasDynamicInputParam,
        dynamicOutputParam,
        dataMapping,
      ]) => {
        let availableSteps: ITaskCreationConfig[] = [];
        if (gatewayConfig) {
          availableSteps.push({
            taskCreationStep:
              TaskCreationStep.ConfigureErrorGatewayEntranceConnection,
            element: gatewayConfig,
          } as ITaskCreationConfig);
        }
        if (!!this.data?.data?.taskCreationPayload?.configureActivity) {
          availableSteps.push({
            taskCreationStep: TaskCreationStep.ConfigureFunctionSelection,
            element: this.data.data.taskCreationPayload.configureActivity,
          } as ITaskCreationConfig);
        }
        if (hasDynamicInputParam) {
          availableSteps.push({
            taskCreationStep: TaskCreationStep.ConfigureFunctionInput,
            element: hasDynamicInputParam,
          } as ITaskCreationConfig);
        }
        if (customImplementation) {
          availableSteps.push({
            taskCreationStep: TaskCreationStep.ConfigureFunctionImplementation,
            element: customImplementation,
          } as ITaskCreationConfig);
        }
        if (dataMapping) {
          availableSteps.push({
            taskCreationStep: TaskCreationStep.ConfigureInputOutputMapping,
            element: dataMapping,
          } as ITaskCreationConfig);
        }
        if (customImplementation || dynamicOutputParam) {
          availableSteps.push({
            taskCreationStep: TaskCreationStep.ConfigureFunctionOutput,
            element: dynamicOutputParam,
          } as ITaskCreationConfig);
        }
        return availableSteps;
      }
    ),
    shareReplay(1)
  ) as Observable<ITaskCreationConfig[]>;

  currentStep$ = combineLatest([this.steps$, this.currentStepIndex$]).pipe(
    map(([steps, index]) => steps[index])
  );
  canAnalyzeCustomImplementation$ = this.currentStep$.pipe(
    filter((x) => (x ? true : false)),
    map(
      (x) =>
        x.taskCreationStep ===
          TaskCreationStep.ConfigureFunctionImplementation ||
        x.taskCreationStep === TaskCreationStep.ConfigureFunctionOutput
    )
  );

  func$: Observable<IFunction | null | undefined> = this._store.select(
    selectIFunction(() => this.functionIdentifierControl.value)
  );

  private _statusMessage: Subject<string> = new Subject<string>();
  statusMessage$ = combineLatest([
    this._statusMessage.asObservable(),
    this._statusMessage.pipe(switchMap(() => interval(1000))),
  ]).pipe(
    map(([val, time]: [string, number]) => {
      return time < 5 ? val : null;
    })
  );

  formGroup!: UntypedFormGroup;

  private _subscriptions = new Subscription();

  constructor(
    @Inject(PROCESS_BUILDER_CONFIG_TOKEN) public config: IProcessBuilderConfig,
    @Inject(MAT_DIALOG_DATA) public data: ITaskCreationComponentInput,
    @Inject(INJECTOR_INTERFACE_TOKEN)
    private _injectorInterface: { injector: object },
    @Inject(INJECTOR_TOKEN) private _injector: { injector: object },
    private _ref: MatDialogRef<TaskCreationComponent>,
    private _store: Store,
    private _formBuilder: UntypedFormBuilder
  ) {
    this.formGroup = this._formBuilder.group({
      functionIdentifier: null,
      canFail: false,
      implementation: null,
      requireCustomImplementation: null,
      name: config.defaultFunctionName,
      normalizedName: ProcessBuilderRepository.normalizeName(
        config.defaultFunctionName
      ),
      outputParamName: config.dynamicParamDefaultNaming,
      normalizedOutputParamName: ProcessBuilderRepository.normalizeName(
        config.dynamicParamDefaultNaming
      ),
      outputParamValue: null,
      entranceGatewayType: null,
      inputParam: null,
      isProcessOutput: null,
    });
    this.formGroup.patchValue(this.data.data.taskCreationData);
  }

  public abort = () => this._ref.close();
  public finish = () => this._ref.close(this.formGroup.value);

  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public ngOnInit(): void {
    this.stepRegistry[
      TaskCreationStep.ConfigureErrorGatewayEntranceConnection
    ] = {
      type: EmbeddedConfigureErrorGatewayEntranceConnectionComponent,
    };
    this.stepRegistry[TaskCreationStep.ConfigureFunctionSelection] = {
      type: EmbeddedFunctionSelectionComponent,
      provideInputParams: (arg: IEmbeddedView, element: IElement) => {
        let component = arg as EmbeddedFunctionSelectionComponent;
        component.inputParams =
          BPMNJsRepository.getAvailableInputParams(element);
      },
    };
    this.stepRegistry[TaskCreationStep.ConfigureFunctionImplementation] = {
      type: EmbeddedFunctionImplementationComponent,
    };
    this.stepRegistry[TaskCreationStep.ConfigureFunctionOutput] = {
      type: EmbeddedParamEditorComponent,
    };
    this.stepRegistry[TaskCreationStep.ConfigureInputOutputMapping] = {
      type: EmbeddedInputOutputMappingComponent,
      provideInputParams: (arg: IEmbeddedView, element: IElement) => {
        let component = arg as EmbeddedInputOutputMappingComponent;
        component.inputParams =
          BPMNJsRepository.getAvailableInputParams(element);
      },
    };
    this.stepRegistry[TaskCreationStep.ConfigureFunctionInput] = {
      type: EmbeddedFunctionInputSelectionComponent,
      provideInputParams: (arg: IEmbeddedView, element: IElement) => {
        let component = arg as EmbeddedFunctionInputSelectionComponent;
        let availableInputParams =
          BPMNJsRepository.getAvailableInputParams(element);
        component.setInputParams(availableInputParams);
      },
    };
    this._configureGateway.next(
      this.data.data?.taskCreationPayload
        ?.configureIncomingErrorGatewaySequenceFlow ?? null
    );
    this.validateFunctionSelection();
    this.setStep(0);

    this._subscriptions.add(
      ...[
        this.formGroup.controls['implementation'].valueChanges
          .pipe(debounceTime(2000))
          .subscribe(() => {
            let value = this.formGroup.controls['implementation'].value;
            let evaluationResult = CodemirrorRepository.evaluateCustomMethod(
              undefined,
              value
            );
            let inputs = CodemirrorRepository.getUsedInputParams(
              undefined,
              value
            )
              .map((x) => x.propertyName)
              .filter((x, index, array) => array.indexOf(x) === index);
            this._hasOutputParam.next(
              evaluationResult.status ===
                MethodEvaluationStatus.ReturnValueFound
            );
            this._statusMessage.next(
              `input params: ${inputs.length === 0 ? '-' : inputs.join(', ')}`
            );
          }),
        this._customImplementation
          .pipe(
            filter((x) => (x ? true : false)),
            switchMap((element: IElement | null) => {
              let inputParams = BPMNJsRepository.getAvailableInputParams(
                element as IElement
              );
              return this._store.select(selectIParams(inputParams));
            }),
            take(1),
            filter((x) => (x ? true : false)),
            mapIParamsInterfaces(this._store)
          )
          .subscribe((allParams: IParam[]) => {
            for (let param of allParams) {
              (this._injector as any)[param!.normalizedName] =
                ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(
                  param
                );
              (this._injectorInterface.injector as any)[param!.normalizedName] =
                ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(
                  param
                );
            }
          }),
        this.functionIdentifierControl.valueChanges.subscribe(
          (functionIdentifier: number | null) => {
            if (typeof functionIdentifier !== 'number') return;
            this.validateFunctionSelection();
          }
        ),
      ]
    );
  }

  setStep(index: number) {
    this.steps$.pipe(take(1)).subscribe((steps: ITaskCreationConfig[]) => {
      this.dynamicInner.clear();
      this._currentStepIndex.next(index);
      if (!steps[index]) return;
      let step = steps[index];
      if (!this.stepRegistry[step.taskCreationStep]) {
        debugger;
        throw 'unregistered step';
      }
      let component = this.dynamicInner.createComponent(
        this.stepRegistry[step.taskCreationStep].type
      );
      if (
        typeof this.stepRegistry[step.taskCreationStep].provideInputParams ===
        'function'
      )
        this.stepRegistry[step.taskCreationStep].provideInputParams!(
          component.instance,
          step.element
        );

      component.instance.formGroup = this.formGroup;
    });
  }

  public testImplementation() {
    let customImplementation = this.formGroup.controls['implementation']?.value;
    if (customImplementation) {
      const result =
        ProcessBuilderRepository.executeUserMethodAndReturnResponse(
          customImplementation,
          this._injector
        );
      result.subscribe({
        next: (result: any) => {
          let parsed: string =
            typeof result === 'object'
              ? JSON.stringify(result)
              : typeof result === 'number'
              ? result.toString()
              : result;
          this._statusMessage.next(`succeeded! received: ${parsed}`);
          this.formGroup.controls['outputParamValue'].setValue(
            ProcessBuilderRepository.extractObjectTypeDefinition(result)
          );
        },
      });
      return;
    } else if (typeof this.functionIdentifierControl.value === 'number') {
      this._store
        .select(selectIFunction(this.functionIdentifierControl.value))
        .pipe(take(1))
        .subscribe((func: IFunction | null | undefined) => {
          if (func && typeof func.pseudoImplementation === 'function') {
            func
              .pseudoImplementation()
              .then((result: object) => {
                this.formGroup.controls['outputParamValue'].setValue(
                  ProcessBuilderRepository.extractObjectTypeDefinition(result)
                );
              })
              .catch((reason: string) => alert(reason));
          }
        });
    }
  }

  validateFunctionSelection() {
    this._store
      .select(selectIFunction(this.functionIdentifierControl.value))
      .pipe(
        take(1),
        filter((x) => (x ? true : false)),
        switchMap((fun: IFunction | null | undefined) =>
          combineLatest([
            of(fun),
            this._store.select(selectIParam(fun?.output?.param)),
            this._store.select(selectIInterface(fun?.output?.interface)),
          ])
        )
      )
      .subscribe(
        ([fun, outputParam, outputParamInterface]: [
          IFunction | null | undefined,
          IParam | null | undefined,
          IInterface | null | undefined
        ]) => {
          if (!fun) {
            return;
          }
          const inputParams =
            fun.useDynamicInputParams && fun.inputParams
              ? Array.isArray(fun.inputParams)
                ? [...fun.inputParams]
                : [fun.inputParams]
              : [];
          let outputParamValue =
            fun.output?.param === 'dynamic' && outputParamInterface
              ? outputParamInterface.typeDef
              : outputParam?.typeDef;
          this.formGroup.patchValue({
            canFail: fun?.canFail,
            implementation: fun?.customImplementation,
            requireCustomImplementation: fun?.requireCustomImplementation,
            name: fun?.name,
            normalizedName: fun?.normalizedName,
            normalizedOutputParamName: outputParam?.normalizedName,
            outputParamName: outputParam?.name,
            outputParamValue: outputParamValue,
            entranceGatewayType: null,
            inputParam: inputParams.length === 1 ? inputParams[0].param : null,
          } as IEmbeddedFunctionImplementationData);
          let hasCustomImplementation =
            (this.requireCustomImplementationControl.value ||
              this.implementationControl.value) &&
            this.data.data.taskCreationPayload.configureActivity
              ? true
              : false;
          this._customImplementation.next(
            hasCustomImplementation
              ? this.data.data.taskCreationPayload.configureActivity ?? null
              : null
          );
          this._hasDynamicInputParam.next(
            (fun?.useDynamicInputParams &&
              !(fun.requireCustomImplementation || fun.customImplementation)) ??
              false
              ? this.data.data.taskCreationPayload.configureActivity
              : null
          );
          this._hasDynamicOutputParam.next(
            fun?.output?.param === 'dynamic' ?? false
              ? this.data.data.taskCreationPayload.configureActivity
              : null
          );
          this._hasDataMapping.next(
            fun?.requireDataMapping ?? false
              ? this.data.data.taskCreationPayload.configureActivity
              : null
          );
        }
      );
  }

  TaskCreationStep = TaskCreationStep;

  get functionIdentifierControl(): UntypedFormControl {
    return this.formGroup.controls['functionIdentifier'] as UntypedFormControl;
  }
  get implementationControl(): UntypedFormControl {
    return this.formGroup.controls['implementation'] as UntypedFormControl;
  }
  get requireCustomImplementationControl(): UntypedFormControl {
    return this.formGroup.controls[
      'requireCustomImplementation'
    ] as UntypedFormControl;
  }

  get finished() {
    return !this.unfinished;
  }
  get unfinished() {
    return false;
  }
}
