import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { FUNCTIONS_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/function.interface';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmn-js.service';
import { ProcessBuilderWrapperModule } from '../../process-builder-wrapper.module';

import { ProcessBuilderWrapperComponent } from './process-builder-wrapper.component';

describe('ProcessBuilderWrapperComponent', () => {
  let component: ProcessBuilderWrapperComponent;
  let fixture: ComponentFixture<ProcessBuilderWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessBuilderWrapperComponent],
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderWrapperModule
      ],
      providers: [
        BpmnJsService,
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
        { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBuilderWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
