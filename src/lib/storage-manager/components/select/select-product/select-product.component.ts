import { AfterViewChecked, Component, EventEmitter, forwardRef, OnDestroy, Output } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IProduct } from '@smgr/interfaces';
import { addProduct, selectProducts } from '@smgr/store';

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
export class SelectProductComponent implements AfterViewChecked, ControlValueAccessor, OnDestroy {

  @Output() public productChanged = new EventEmitter<string>();

  public products$ = this._store.select(selectProducts);
  public valueControl: UntypedFormControl = new UntypedFormControl();

  private _subscription: Subscription = new Subscription();

  constructor(private _store: Store) { }

  public addProduct(event: KeyboardEvent) {
    event.stopPropagation();
    this._store.dispatch(addProduct({
      product: {
        'description': (event.target as HTMLInputElement).value,
        'height': 0,
        'length': 0,
        'width': 0
      } as IProduct
    }));
    (event.target as HTMLInputElement).value = '';
  }

  public ngAfterViewChecked(): void {
    this._subscription.add(
      this.valueControl.valueChanges
        .subscribe((productDescription: string) => {
          this.productChanged.next(productDescription);
        })
    );
  }
  public ngOnDestroy = () => this._subscription.unsubscribe();

  public onChange: (arg: any) => void = () => { };
  public onTouched: () => void = () => { };
  public registerOnTouched = (fn: any) => this.onTouched = fn;
  public registerOnChange = (fn: any) => this.onChange = fn;

  public setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

  public writeValue = (val: any) => this.valueControl.patchValue(val);
}
