import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IGroup } from 'src/lib/storage-manager-store/interfaces/group.interface';
import { ControlsOf } from 'src/lib/shared/globals/controls-of.type';

import { GroupsFormComponent } from './groups-form.component';

describe('GroupsFormComponent', () => {
  let component: GroupsFormComponent;
  let fixture: ComponentFixture<GroupsFormComponent>;
  let debugElement: DebugElement;
  const expectedFormControls: { controlName: (keyof IGroup), inputType: string }[] = [
    { controlName: 'sequenceNumber', inputType: 'number' },
    { controlName: 'color', inputType: 'color' },
    { controlName: 'desc', inputType: 'text' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupsFormComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: new FormArray([
              new FormGroup<ControlsOf<IGroup>>({
                color: new FormControl(''),
                desc: new FormControl(''),
                id: new FormControl('', { nonNullable: true }),
                sequenceNumber: new FormControl(1, { nonNullable: true })
              })
            ])
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GroupsFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  expectedFormControls.forEach(control => {

    it(`should contain form control for ${control.controlName}`, () => {
      const controlDebugElement = debugElement.query(By.css(`[formcontrolname=${control.controlName}]`));
      expect(controlDebugElement).toBeTruthy();
      expect((controlDebugElement.nativeElement as HTMLInputElement).type).toBe(control.inputType);
    });

  });

});
