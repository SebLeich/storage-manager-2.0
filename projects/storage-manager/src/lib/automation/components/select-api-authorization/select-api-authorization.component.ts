import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { apiCallAuthorizationTypeToString, API_CALL_AUTHORIZATION } from '../../globals';

@Component({
  selector: 'app-select-api-authorization',
  templateUrl: './select-api-authorization.component.html',
  styleUrls: ['./select-api-authorization.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectApiAuthorizationComponent),
      multi: true
    }
  ]
})
export class SelectApiAuthorizationComponent implements ControlValueAccessor, OnDestroy {

  @Input() public appearance: null | MatFormFieldAppearance = null;

  valueControl = new FormControl(API_CALL_AUTHORIZATION.NO_AUTH);

  authorizationTypes = Object.values(API_CALL_AUTHORIZATION).filter(x => typeof x === 'number').map((x) => {
    return { display: apiCallAuthorizationTypeToString(x as any), type: x.valueOf() };
  });

  private _subscription = new Subscription();

  public ngOnDestroy = () => this._subscription.unsubscribe();

  public onTouched: () => void = () => { };
  registerOnTouched = (fn: any) => this.onTouched = fn;

  registerOnChange(fn: any): void {
    this._subscription.add(this.valueControl.valueChanges.subscribe(fn));
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

  writeValue = (val: any) => this.valueControl.patchValue(val);
}
