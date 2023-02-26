import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { IProduct } from '@smgr/interfaces';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { removeProduct } from '@smgr/store';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public columns: string[] = ['description', 'length', 'width', 'height', '3dmodel', 'controls'];
  public productsControl!: FormArray<FormControl<IProduct>>;
  public active: string = 'description';
  public direction: SortDirection = 'asc';
  public totalItemCount = 0;

  private _subscription = new Subscription();

  constructor(private _controlContainer: ControlContainer, private _store: Store) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.productsControl = this._controlContainer.control as FormArray;
  }

  public removeProduct(index: number) {
    const product = this.productsControl.controls[index].value;
    this._store.dispatch(removeProduct({ removeProduct: product }));
  }

  public submit(event?: Event) {
    if(event){
      event.stopPropagation();
      event.preventDefault();
    }
    (document.activeElement as HTMLElement)?.blur();
  }

}
