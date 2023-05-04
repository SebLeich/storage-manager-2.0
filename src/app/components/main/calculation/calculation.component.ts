import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, debounceTime, map, take } from 'rxjs/operators';
import { ConfigureApiCallService } from 'src/lib/automation/services/configure-api-call.service';
import { showAnimation } from 'src/lib/shared/animations/show';
import { ApiCallConfiguratorDialogComponent } from '../../dialog/api-call-configurator-dialog/api-call-configurator-dialog.component';
import { NoSolutionDialogComponent } from '../../dialog/no-solution-dialog/no-solution-dialog.component';
import { CalculationComponentService } from './calculation-component.service';
import { AlgorithmCalculationStatus } from './enumerations/algorithm-calculation-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { bottomUpFadeIn } from '@animations';
import { selectCalculationContextValid } from '@smgr/store';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css'],
  providers: [CalculationComponentService],
  animations: [showAnimation, bottomUpFadeIn]
})
export class CalculationComponent implements OnDestroy, OnInit {

  private _calculationContextInvalid$ = this._store.select(selectCalculationContextValid).pipe(debounceTime(10), map(valid => !valid));
  AlgorithmCalculationStatus = AlgorithmCalculationStatus;

  private _subscriptions: Subscription = new Subscription();

  constructor(
    public calculationComponentService: CalculationComponentService,
    public configureApiCallService: ConfigureApiCallService,
    private _dialog: MatDialog,
    private _viewContainerRef: ViewContainerRef,
    private _store: Store
  ) { }

  configureAPICall() {
    this._dialog.open(ApiCallConfiguratorDialogComponent, {
      panelClass: 'no-padding-dialog'
    });
  }

  public ngOnDestroy = () => this._subscriptions.unsubscribe();

  public ngOnInit(): void {
    this._subscriptions.add(
      this._calculationContextInvalid$
        .pipe(
          debounceTime(500),
          filter(calculationContextInvalid => !!calculationContextInvalid),
          take(1)
        )
        .subscribe(() => {
          this._showNoSolutionDialog();
        })
    )
  }

  private _showNoSolutionDialog(closeDialogEnabled: boolean = false) {
    this._dialog.open(NoSolutionDialogComponent, {
      panelClass: 'no-padding-dialog',
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
      data: {
        closeControlEnabled: closeDialogEnabled
      }
    });
  }

}
