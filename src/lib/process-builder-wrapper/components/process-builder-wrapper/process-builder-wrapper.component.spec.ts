import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { ProcessBuilderComponentService } from 'src/lib/process-builder/components/process-builder/process-builder-component.service';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmnjs.service';
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
        ProcessBuilderComponentService,
        BpmnJsService,
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} }
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
