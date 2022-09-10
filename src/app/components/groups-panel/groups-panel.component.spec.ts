import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IGroup } from 'src/app/interfaces/i-group.interface';

import { GroupsPanelComponent } from './groups-panel.component';

import { v4 as generateGuid } from 'uuid';
import calculateRandomColorSharedMethod from 'src/app/methods/calculate-random-color.shared-method';
import { By } from '@angular/platform-browser';

describe('GroupsPanelComponent', () => {

  const groups: IGroup[] = [
    { id: generateGuid(), color: calculateRandomColorSharedMethod(), desc: 'group 1', sequenceNumber: 0 },
    { id: generateGuid(), color: calculateRandomColorSharedMethod(), desc: 'group 2', sequenceNumber: 1 },
    { id: generateGuid(), color: calculateRandomColorSharedMethod(), desc: 'group 3', sequenceNumber: 2 }
  ];

  let component: GroupsPanelComponent;
  let fixture: ComponentFixture<GroupsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsPanelComponent ],
      imports: [
        ...defaultImportsConstant,
        AppModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all groups', () => {
    component.groups = groups;
    fixture.detectChanges();

    const groupRows = fixture.debugElement.queryAll(By.css('.smgr-table-body-row'));
    expect(groupRows.length).toBe(groups.length);
  });
});
