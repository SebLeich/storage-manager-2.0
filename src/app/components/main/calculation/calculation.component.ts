import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Order } from 'src/app/classes';
import { DataService } from 'src/app/services/data.service';
import { ConfigureApiCallService } from 'src/lib/automation/services/configure-api-call.service';
import { showAnimation } from 'src/lib/shared/animations/show';
import { ApiCallConfiguratorDialogComponent } from '../../dialog/api-call-configurator-dialog/api-call-configurator-dialog.component';
import { NoSolutionDialogComponent } from '../../dialog/no-solution-dialog/no-solution-dialog.component';
import { CalculationComponentService } from './calculation-component.service';
import { AlgorithmCalculationStatus } from './enumerations/algorithm-calculation-status.enum';

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

  private _subscriptions: Subscription[] = [];

  constructor(
    public calculationComponentService: CalculationComponentService,
    private _matDialog: MatDialog,
    public configureApiCallService: ConfigureApiCallService,
    private _dataService: DataService,
    private _dialog: MatDialog,
    private _viewContainerRef: ViewContainerRef
  ) { }

  configureAPICall() {
    this._matDialog.open(ApiCallConfiguratorDialogComponent, {
      panelClass: 'no-padding-dialog'
    });
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

  ngOnInit(): void {
    this._subscriptions.push(...[
      this._dataService.orders$
        .pipe(filter((orders: Order[]) => orders.length === 0 ? true : false))
        .subscribe(() => this.showNoSolutionDialog())
    ])
  }

  showNoSolutionDialog() {
    this._dialog.open(NoSolutionDialogComponent, {
      panelClass: 'no-padding-dialog',
      disableClose: true,
      viewContainerRef: this._viewContainerRef
    });
  }

}
