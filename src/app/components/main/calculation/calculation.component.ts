import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ConfigureApiCallService } from 'src/lib/automation/services/configure-api-call.service';
import { showAnimation } from 'src/lib/shared/animations/show';
import { ApiCallConfiguratorDialogComponent } from '../../dialog/api-call-configurator-dialog/api-call-configurator-dialog.component';
import { NoSolutionDialogComponent } from '../../dialog/no-solution-dialog/no-solution-dialog.component';
import { CalculationComponentService } from './calculation-component.service';
import { AlgorithmCalculationStatus } from './enumerations/algorithm-calculation-status.enum';

import { MatDialog } from '@angular/material/dialog';

import * as fromIOrderState from 'src/app/store/reducers/i-order.reducers';
import { selectOrders } from 'src/app/store/selectors/i-order.selectors';
import { IOrder } from 'src/app/interfaces/i-order.interface';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css'],
  providers: [
    CalculationComponentService
  ],
  animations: [showAnimation]
})
export class CalculationComponent implements OnDestroy, OnInit {

  AlgorithmCalculationStatus = AlgorithmCalculationStatus;

  private _subscriptions: Subscription = new Subscription();

  constructor(
    public calculationComponentService: CalculationComponentService,
    public configureApiCallService: ConfigureApiCallService,
    private _dialog: MatDialog,
    private _viewContainerRef: ViewContainerRef,
    private _orderStore: Store<fromIOrderState.State>,
  ) { }

  configureAPICall() {
    this._matDialog.open(ApiCallConfiguratorDialogComponent, {
      panelClass: 'no-padding-dialog'
    });
  }

  ngOnDestroy = () => this._subscriptions.unsubscribe();

  ngOnInit(): void {
    this._subscriptions.add(...[
      this._orderStore.select(selectOrders)
        .pipe(filter((orders: IOrder[]) => orders.length === 0 ? true : false))
        .subscribe(() => this._showNoSolutionDialog()),
    ]);
  }

  private _showNoSolutionDialog() {
    this._dialog.open(NoSolutionDialogComponent, {
      panelClass: 'no-padding-dialog',
      disableClose: true,
      viewContainerRef: this._viewContainerRef
    });
  }

}
