import { v4 as generateGuid } from 'uuid';
import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, startWith, Subscription } from 'rxjs';
import { selectGroups } from 'src/lib/storage-manager-store/store/selectors/group.selectors';
import { addGroup } from 'src/lib/storage-manager-store/store/actions/group.actions';

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

  public groups$ = this._store.select(selectGroups);
  public valueControl: UntypedFormControl = new UntypedFormControl();

  public currentGroup$ = combineLatest([this.groups$, this.valueControl.valueChanges.pipe(startWith(this.valueControl.value))]).pipe(map(([groups, _]) => {
    return groups.find(group => group.id === this.valueControl.value);
  }));

  private _subscriptions = new Subscription();

  constructor(private _store: Store) { }

  public addGroup(event: KeyboardEvent) {
    event.stopPropagation();
    this._store.dispatch(addGroup({
      group: {
        id: generateGuid(),
        desc: (event.target as HTMLInputElement).value
      } as any
    }));
    (event.target as HTMLInputElement).value = '';
  }

  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public onTouched: () => void = () => { };
  public registerOnTouched = (fn: any) => this.onTouched = fn;

  public registerOnChange(fn: any): void {
    this._subscriptions.add(this.valueControl.valueChanges.subscribe(fn));
  }

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

  public writeValue(value: any) {
    this.valueControl.setValue(value);
  }

}
