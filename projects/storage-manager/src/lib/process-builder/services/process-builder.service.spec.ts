import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { selectSnapshot } from '../globals/select-snapshot';
import { IBpmnJSModel } from '../interfaces/bpmn-js-model.interface';
import { ProcessBuilderModule } from '../process-builder.module';
import { addIBpmnJSModels, setCurrentIBpmnJSModel } from '../store/actions/bpmn-js-model.actions';
import { selectCurrentIBpmnJSModel, selectCurrentIBpmnJSModelGuid, selectIBpmnJSModels } from '../store/selectors/bpmn-js-model.selectors';

import { ProcessBuilderService } from './process-builder.service';

describe('ProcessBuilderService', () => {
  let service: ProcessBuilderService;
  let store: Store;
  const bpmnJsModels = [
    { guid: 'model1' } as IBpmnJSModel,
    { guid: 'model2' } as IBpmnJSModel,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ]
    });
    service = TestBed.inject(ProcessBuilderService);
    store = TestBed.inject(Store);

    store.dispatch(addIBpmnJSModels(bpmnJsModels));
    store.dispatch(setCurrentIBpmnJSModel(bpmnJsModels[0].guid));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create new bpmn js model', async () => {
    const initialBpmnJsModelCount = (await selectSnapshot(TestBed.inject(Store).select(selectIBpmnJSModels()))).length;
    service.createBpmnJsModel();

    const stateBpmnJsModels = await selectSnapshot(TestBed.inject(Store).select(selectIBpmnJSModels()));
    expect(stateBpmnJsModels.length).toBe(initialBpmnJsModelCount + 1);
  });

  it('should reset local state', () => {
    spyOn(service, '_reloadLocation' as any).and.callFake(() => {
      // prevent location reload
    });

    localStorage.setItem('funcs', 'some value');
    localStorage.setItem('models', 'some value');
    localStorage.setItem('params', 'some value');

    service.resetLocalState();
    expect(localStorage.getItem('funcs')).toBeFalsy();
    expect(localStorage.getItem('models')).toBeFalsy();
    expect(localStorage.getItem('params')).toBeFalsy();
  });

  bpmnJsModels.forEach(bpmnJsModel => {

    it(`should set next bpmn js model, starting with ${bpmnJsModel.guid}`, async () => {
      store.dispatch(setCurrentIBpmnJSModel(bpmnJsModel.guid));
      await service.setNextModel();
      const currentBpmnJsModelGuid = await selectSnapshot(store.select(selectCurrentIBpmnJSModelGuid));
      expect(currentBpmnJsModelGuid).not.toBe(bpmnJsModel.guid);
    });

  });

});
