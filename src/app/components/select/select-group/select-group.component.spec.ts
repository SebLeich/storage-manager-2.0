import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IGroup } from 'src/app/interfaces/i-group.interface';
import { addGroups } from 'src/app/store/actions/i-group.actions';

import { SelectGroupComponent } from './select-group.component';

import { v4 as generateGuid } from 'uuid';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { selectGroups } from 'src/app/store/selectors/i-group.selectors';
import { isEqual } from 'lodash';

describe('SelectGroupComponent', () => {
  let component: SelectGroupComponent;
  let fixture: ComponentFixture<SelectGroupComponent>;
  let store: Store;
  let groups = [
    { id: generateGuid(), color: '#ffffff', desc: 'first group', sequenceNumber: 1 } as IGroup,
    { id: generateGuid(), color: '#000000', desc: 'second group', sequenceNumber: 2 } as IGroup,
    { id: generateGuid(), color: '#00ccee', desc: 'third group', sequenceNumber: 3 } as IGroup,
    { id: generateGuid(), color: '#7a00ee', desc: '4th group', sequenceNumber: 4 } as IGroup,
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectGroupComponent],
      imports: [
        ...defaultImportsConstant,

        AppModule,
        AppRoutingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SelectGroupComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);

    store.dispatch(addGroups({ groups }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show options for all groups', () => {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger'));
    trigger.nativeElement.click();
    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.css('mat-option:not(.smgr-manual-select-add-input-option)'));

    expect(options.length).toBe(groups.length);
  });

  it('should have option to add group', () => {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger'));
    trigger.nativeElement.click();
    fixture.detectChanges();

    const option = fixture.debugElement.query(By.css('mat-option.smgr-manual-select-add-input-option'));

    expect(option).toBeTruthy();
  });

  it('should add group on add group input enter', async () => {
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger'));
    const newGroupName = 'TEST_GROUP';
    trigger.nativeElement.click();
    fixture.detectChanges();

    const inputDebugElement: DebugElement = fixture.debugElement.query(By.css('mat-option.smgr-manual-select-add-input-option input'));
    const input: HTMLInputElement = inputDebugElement.nativeElement;

    expect(input).toBeTruthy();
    input.value = newGroupName;
    inputDebugElement.triggerEventHandler('keydown.enter', {
      stopPropagation: () => { },
      preventDefault: () => { },
      target: input as any
    } as KeyboardEvent);

    fixture.detectChanges();

    const allGroups = await selectSnapshot(store.select(selectGroups));
    expect(allGroups.length).toBe(groups.length + 1);
    expect(isEqual(allGroups.map(group => group.desc).sort(), [...groups.map(group => group.desc), newGroupName].sort())).toBeTrue();
  });
});
