import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/classes';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectProductComponent),
      multi: true
    }
  ]
})
export class SelectProductComponent implements ControlValueAccessor, OnDestroy, OnInit {

  valueControl: FormControl = new FormControl();

  private _subscriptions: Subscription[] = [];

  constructor(
    public dataService: DataService
  ) { }

  addProduct(event: KeyboardEvent) {
    event.stopPropagation();
    this.dataService.addProduct({
      'description': (event.target as HTMLInputElement).value,
      'height': 0,
      'length': 0,
      'width': 0
    } as Product);
    (event.target as HTMLInputElement).value = null;
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
