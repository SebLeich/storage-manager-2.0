import { Component, forwardRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { nextUnitSize } from 'src/app/globals';

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

  valueControl: UntypedFormControl = new UntypedFormControl();

  units = nextUnitSize.map(x => x.unit);

  private _subscriptions = new Subscription();

  ngOnDestroy = () => this._subscriptions.unsubscribe();

  public onTouched: () => void = () => { };
  registerOnTouched = (fn: any) => this.onTouched = fn;

  registerOnChange(fn: any): void {
    this._subscriptions.add(this.valueControl.valueChanges.subscribe(fn));
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

  writeValue = (val: any) => this.valueControl.patchValue(val);
}
