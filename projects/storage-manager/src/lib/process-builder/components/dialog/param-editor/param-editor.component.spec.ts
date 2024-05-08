import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/interfaces/process-builder-config.interface';

import { ParamEditorComponent } from './param-editor.component';

describe('ParamEditorComponent', () => {
  let component: ParamEditorComponent;
  let fixture: ComponentFixture<ParamEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParamEditorComponent ],
      imports: [
        ...defaultImportsConstant
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {

            }
          }
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
