import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { FUNCTIONS_CONFIG_TOKEN } from '../../globals/i-function';
import { PROCESS_BUILDER_CONFIG_TOKEN } from '../../globals/i-process-builder-config';
import { ProcessBuilderModule } from '../../process-builder.module';

import { ProcessBuilderComponent } from './process-builder.component';

describe('ProcessBuilderComponent', () => {
  let component: ProcessBuilderComponent;
  let fixture: ComponentFixture<ProcessBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessBuilderComponent],
      imports: [
        ...defaultImportsConstant,

        ProcessBuilderModule
      ],
      providers: [
        { provide: FUNCTIONS_CONFIG_TOKEN, useValue: [] },
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
