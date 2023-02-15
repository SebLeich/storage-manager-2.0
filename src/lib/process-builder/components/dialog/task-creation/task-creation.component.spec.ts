import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import processBuilderConfig from 'src/config/process-builder-config';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { IFunction } from 'src/lib/process-builder/interfaces/function.interface';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { TaskCreationStep } from 'src/lib/process-builder/globals/task-creation-step';
import { TaskCreationStepPipe } from 'src/lib/process-builder/pipes/task-creation-step.pipe';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';
import { addIFunctions } from 'src/lib/process-builder/store/actions/function.actions';

import { TaskCreationComponent } from './task-creation.component';
import { ExemplaryBpmnModel } from './test/exemplary-bpmn-model';
import { By } from '@angular/platform-browser';
import { ITaskCreationPayload } from 'src/lib/process-builder/interfaces/task-creation-payload.interface';

describe('TaskCreationComponent', () => {
  let component: TaskCreationComponent;
  let fixture: ComponentFixture<TaskCreationComponent>;
  let debugElement: DebugElement;
  let exemplaryBpmnModel = new ExemplaryBpmnModel();
  let bpmnJsService: BpmnJsService;
  const diagramWrapper = document.createElement('div');
  let taskCreationPayload: ITaskCreationPayload = {
    configureIncomingErrorGatewaySequenceFlow: {},
    configureActivity: {},
  } as ITaskCreationPayload;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCreationComponent, TaskCreationStepPipe],
      imports: [...defaultImportsConstant, AppModule, AppRoutingModule],
      providers: [
        BpmnJsService,
        {
          provide: MatDialogRef,
          useValue: {
            close: () => { },
          },
        },
        {
          provide: PROCESS_BUILDER_CONFIG_TOKEN,
          useValue: processBuilderConfig,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            data: {
              taskCreationData: {},
              taskCreationPayload: taskCreationPayload,
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreationComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    bpmnJsService = TestBed.inject(BpmnJsService);

    const store = TestBed.inject(Store);
    store.dispatch(
      addIFunctions([{ identifier: 1, name: 'function 1' } as IFunction])
    );

    document.body.appendChild(diagramWrapper);
    bpmnJsService.bpmnJs.attachTo(diagramWrapper);

    await bpmnJsService.bpmnJs.importXML(exemplaryBpmnModel.bpmnJsModel);

    taskCreationPayload.configureActivity =
      bpmnJsService.elementRegistryModule.get(
        exemplaryBpmnModel.activityGuid
      ) as IElement;
  });

  afterEach(() => {
    if (diagramWrapper) {
      document.body.removeChild(diagramWrapper);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display function selection in case activity provided for configuration', async () => {
    taskCreationPayload.configureActivity = bpmnJsService.elementRegistryModule.get(
      exemplaryBpmnModel.activityGuid
    ) as IElement;

    component.validateFunctionSelection();
    fixture.detectChanges();

    const availableSteps = await selectSnapshot(component.steps$);
    const tabLabels = debugElement.queryAll(By.css('.mdc-tab__text-label'));
    const hasFunctionSelectionStep = availableSteps.some((step) => step.taskCreationStep === TaskCreationStep.ConfigureFunctionSelection);
    const functionSelectionTitle = new TaskCreationStepPipe().transform(TaskCreationStep.ConfigureFunctionSelection);
    const functionSelectionTabTitle = tabLabels.find((label) => (label.nativeElement as HTMLDivElement).textContent === functionSelectionTitle);

    expect(hasFunctionSelectionStep).toBeTrue();
    expect(functionSelectionTabTitle).toBeTruthy();
  });
});
