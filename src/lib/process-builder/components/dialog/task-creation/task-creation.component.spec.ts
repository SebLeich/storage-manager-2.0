import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { PROCESS_BUILDER_CONFIG_TOKEN } from 'src/lib/process-builder/globals/i-process-builder-config';
import { INJECTOR_INTERFACE_TOKEN, INJECTOR_TOKEN } from 'src/lib/process-builder/globals/injector';

import { TaskCreationComponent } from './task-creation.component';

describe('TaskCreationComponent', () => {
  let component: TaskCreationComponent;
  let fixture: ComponentFixture<TaskCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskCreationComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        {
          provide: MatDialogRef, useValue: {
            close: () => {

            }
          }
        },
        { provide: PROCESS_BUILDER_CONFIG_TOKEN, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {
            data: {
              data: {

              },
              payload: {
                configureIncomingErrorGatewaySequenceFlow: {
  
                }
              }
            }
          }
        },
        { provide: INJECTOR_INTERFACE_TOKEN, useValue: {} },
        { provide: INJECTOR_TOKEN, useValue: {} },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
