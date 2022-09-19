import { AfterViewChecked, Component, EventEmitter, forwardRef, OnDestroy, Output } from '@angular/core';
import { ControlValueAccessor, UntypedFormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/i-product.interface';
import { addProduct } from 'src/app/store/actions/i-product.actions';

import * as fromIProductState from 'src/app/store/reducers/i-product.reducers';

import { selectProducts } from 'src/app/store/selectors/i-product.selectors';

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

  public products$ = this._productStore.select(selectProducts);
  public valueControl: UntypedFormControl = new UntypedFormControl();

  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _productStore: Store<fromIProductState.State>
  ) { }

  public addProduct(event: KeyboardEvent) {
    event.stopPropagation();
    this._productStore.dispatch(addProduct({
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
    this._subscriptions.add(
      this.valueControl.valueChanges
        .subscribe((productDescription: string) => {
          this.productChanged.next(productDescription);
        })
    );
  }
  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public onChange: (arg: any) => void = () => { };
  public onTouched: () => void = () => { };
  registerOnTouched = (fn: any) => this.onTouched = fn;
  registerOnChange = (fn: any) => this.onChange = fn;

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.valueControl.disable() : this.valueControl.enable();
  }

  writeValue = (val: any) => this.valueControl.patchValue(val);
}
