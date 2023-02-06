import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IGroup } from 'src/lib/storage-manager-store/interfaces/group.interface';
import { SelectGroupComponent } from './select-group.component';
import { v4 as generateGuid } from 'uuid';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { isEqual } from 'lodash';
import { MatSelect } from '@angular/material/select';
import { selectGroups } from 'src/lib/storage-manager-store/store/selectors/group.selectors';
import { addGroups } from 'src/lib/storage-manager-store/store/actions/group.actions';

describe('SelectGroupComponent', () => {
  let component: SelectGroupComponent;
  let fixture: ComponentFixture<SelectGroupComponent>;
  let store: Store;

  const groups = [
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

  it('should have option to add group', () => {
    const matSelect: MatSelect = fixture.debugElement.query(By.css('mat-select')).componentInstance;
    const inputOption = getInputOption(matSelect);

    expect(inputOption).toBeTruthy();
  });

  it('should show options for all groups', () => {
    const matSelect: MatSelect = fixture.debugElement.query(By.css('mat-select')).componentInstance;
    const inputOption = getInputOption(matSelect);
    const options = matSelect.options.filter(option => option !== inputOption);

    expect(options.length).toBe(groups.length);
  });

  it('should add group on add group input enter', async () => {
    const newGroupName = 'TEST_GROUP';
    const matSelect: MatSelect = fixture.debugElement.query(By.css('mat-select')).componentInstance;

    matSelect.open();
    fixture.detectChanges();
    
    const inputDebugElement: DebugElement = fixture.debugElement.query(By.css('#input-option input'));
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

function getInputOption(matSelect: MatSelect){
  return matSelect.options.find(option => option.id === 'input-option');
}
