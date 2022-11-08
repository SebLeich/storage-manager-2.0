import { TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { FUNCTIONS_CONFIG_TOKEN } from '../../globals/i-function';
import { PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { ProcessBuilderModule } from '../../process-builder.module';
import { BpmnJsService } from '../../services/bpmn-js.service';

import { ProcessBuilderComponentService } from './process-builder-component.service';

describe('ProcessBuilderComponentService', () => {
  let service: ProcessBuilderComponentService;
  let bpmnJsService: BpmnJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ],
      providers: [
        ProcessBuilderComponentService,
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
        { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] }
      ]
    });
    service = TestBed.inject(ProcessBuilderComponentService);
    bpmnJsService = TestBed.inject(BpmnJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('task creation aborted', () => {

    it('should remove activity if no method is assigned to the activity', () => {
      const modelingModuleMock = { 'removeElements': () => { } };
      const modelingModuleSpy = spyOn(modelingModuleMock, 'removeElements');
      spyOnProperty(bpmnJsService, 'modelingModule', 'get').and.returnValue(modelingModuleMock as any);

      const activity = {
        businessObject: { }
      };
      service.applyTaskCreationConfig({
        configureActivity: activity
      } as any);

      expect(modelingModuleSpy).toHaveBeenCalledTimes(1);
    });

  });

  describe('task creation confirmed', () => {

    it('should not remove activity', () => {
      const modelingModuleMock = { 'removeElements': () => { } };
      const modelingModuleSpy = spyOn(modelingModuleMock, 'removeElements');
      spyOnProperty(bpmnJsService, 'modelingModule', 'get').and.returnValue(modelingModuleMock as any);

      const activity = {
        businessObject: { }
      };
      service.applyTaskCreationConfig({
        configureActivity: activity
      } as any, { } as any);

      expect(modelingModuleSpy).not.toHaveBeenCalled()
    });

  });
});
