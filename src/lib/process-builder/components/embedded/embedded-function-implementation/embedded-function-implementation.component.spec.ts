import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { INJECTOR_INTERFACE_TOKEN } from 'src/lib/process-builder/globals/injector';

import { EmbeddedFunctionImplementationComponent } from './embedded-function-implementation.component';

describe('EmbeddedFunctionImplementationComponent', () => {
  let component: EmbeddedFunctionImplementationComponent;
  let fixture: ComponentFixture<EmbeddedFunctionImplementationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmbeddedFunctionImplementationComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
        { provide: INJECTOR_INTERFACE_TOKEN, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedFunctionImplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
