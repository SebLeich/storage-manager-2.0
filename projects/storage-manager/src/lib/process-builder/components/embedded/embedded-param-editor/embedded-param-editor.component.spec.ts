import { ComponentFixture, TestBed } from '@angular/core/testing';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';

import { EmbeddedParamEditorComponent } from './embedded-param-editor.component';

describe('EmbeddedParamEditorComponent', () => {
  let component: EmbeddedParamEditorComponent;
  let fixture: ComponentFixture<EmbeddedParamEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmbeddedParamEditorComponent],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedParamEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
