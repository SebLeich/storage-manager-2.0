import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/classes';
import { DataService } from 'src/app/services/data.service';

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

  valueControl: FormControl = new FormControl();

  private _subscriptions: Subscription[] = [];

  constructor(
    public dataService: DataService
  ) { }

  addGroup(event: KeyboardEvent) {
    event.stopPropagation();
    this.dataService.addGroup({ '_Desc': (event.target as HTMLInputElement).value } as Group);
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
