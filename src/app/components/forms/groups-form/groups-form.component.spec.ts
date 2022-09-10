import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, FormArray, FormControl, FormGroup } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IGroup } from 'src/app/interfaces/i-group.interface';
import { ControlsOf } from 'src/lib/shared/globals/controls-of.type';

import { GroupsFormComponent } from './groups-form.component';

describe('GroupsFormComponent', () => {
  let component: GroupsFormComponent;
  let fixture: ComponentFixture<GroupsFormComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
