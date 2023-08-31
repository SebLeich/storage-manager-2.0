import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { units } from 'src/app/globals';

/**
 * @summary the component enables users to select a known units taen from the global unit registry
 */
@Component({
  selector: 'app-select-unit',
  templateUrl: './select-unit.component.html',
  styleUrls: ['./select-unit.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectUnitComponent),
      multi: true
    }
  ]
})
export class SelectUnitComponent implements ControlValueAccessor, OnDestroy {

  public valueControl: UntypedFormControl = new UntypedFormControl();
  public units = units.map(x => x.unit);
  
  private _subscriptions = new Subscription();

  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public onTouched: () => void = () => { };
  public registerOnTouched = (fn: any) => this.onTouched = fn;

  public registerOnChange(fn: any): void {
    this._subscriptions.add(this.valueControl.valueChanges.subscribe(fn));
  }

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

  public writeValue = (val: any) => this.valueControl.patchValue(val);
}
