import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { ProcessBuilderComponentService } from 'src/lib/process-builder/components/process-builder/process-builder-component.service';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { BpmnJsService } from 'src/lib/process-builder/services/bpmnjs.service';

import { MethodQuickInteractionComponent } from './method-quick-interaction.component';

describe('MethodQuickInteractionComponent', () => {
  let component: MethodQuickInteractionComponent;
  let fixture: ComponentFixture<MethodQuickInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MethodQuickInteractionComponent ],
      imports: [
        ...defaultImportsConstant
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
    fixture = TestBed.createComponent(MethodQuickInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
