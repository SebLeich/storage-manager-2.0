import { v4 as generateGuid } from 'uuid';
import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
export class SelectGroupComponent implements ControlValueAccessor, OnDestroy, OnInit {

  groups$ = this._groupStore.select(selectGroups);

  valueControl: UntypedFormControl = new UntypedFormControl();

  private _subscriptions: Subscription[] = [];

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
      }
    }));
    (event.target as HTMLInputElement).value = '';
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
  }

  public onTouched: () => void = () => { };
  registerOnTouched = (fn: any) => this.onTouched = fn;

  registerOnChange(fn: any): void {
    this._subscriptions.push(this.valueControl.valueChanges.subscribe(fn));
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

  writeValue = (val: any) => this.valueControl.patchValue(val);

}
