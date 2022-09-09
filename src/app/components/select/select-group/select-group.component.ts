import { v4 as generateGuid } from 'uuid';
import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, startWith, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { addGroup } from 'src/app/store/actions/i-group.actions';

import * as fromIGroupState from 'src/app/store/reducers/i-group.reducers';
import { selectGroups } from 'src/app/store/selectors/i-group.selectors';

@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectGroupComponent),
      multi: true
    }
  ]
})
export class SelectGroupComponent implements ControlValueAccessor, OnDestroy {

  public groups$ = this._groupStore.select(selectGroups);
  public valueControl: UntypedFormControl = new UntypedFormControl();

  public currentGroup$ = combineLatest([this.groups$, this.valueControl.valueChanges.pipe(startWith(this.valueControl.value))]).pipe(map(([groups, _]) => {
    return groups.find(group => group.id === this.valueControl.value);
  }));

  private _subscriptions = new Subscription();

  constructor(
    public dataService: DataService,
    private _groupStore: Store<fromIGroupState.State>
  ) { }

  addGroup(event: KeyboardEvent) {
    event.stopPropagation();
    this._groupStore.dispatch(addGroup({
      group: {
        id: generateGuid(),
        desc: (event.target as HTMLInputElement).value
      } as any
    }));
    (event.target as HTMLInputElement).value = '';
  }

  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public onTouched: () => void = () => { };
  registerOnTouched = (fn: any) => this.onTouched = fn;

  registerOnChange(fn: any): void {
    this._subscriptions.add(this.valueControl.valueChanges.subscribe(fn));
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

  writeValue(value: any) {
    this.valueControl.setValue(value);
  }

}
