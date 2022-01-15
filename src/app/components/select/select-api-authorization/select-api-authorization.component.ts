import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { apiCallAuthorizationTypeToString, API_CALL_AUTHORIZATION } from 'src/app/globals/api-call-configuration';
import { DataService } from 'src/app/services/data.service';

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
export class SelectApiAuthorizationComponent implements ControlValueAccessor, OnDestroy, OnInit {

  @Input() appearance: null | 'fill' | 'outline' | 'standard' = null;

  valueControl: FormControl = new FormControl(API_CALL_AUTHORIZATION.NO_AUTH);

  authorizationTypes = Object.values(API_CALL_AUTHORIZATION).filter(x => typeof x === 'number').map((x: API_CALL_AUTHORIZATION) => {
    return { display: apiCallAuthorizationTypeToString(x), type: x.valueOf() };
  });

  private _subscriptions: Subscription[] = [];

  constructor(
    public dataService: DataService
  ) { }

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
