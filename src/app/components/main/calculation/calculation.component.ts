import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { showAnimation } from 'src/app/animations';
import { ConfigureApiCallService } from 'src/lib/automation/services/configure-api-call.service';
import { ApiCallConfiguratorDialogComponent } from '../../dialog/api-call-configurator-dialog/api-call-configurator-dialog.component';
import { ALGORITHM_CALCULATION_STATUS } from './calculation-component.classes';
import { CalculationComponentService } from './calculation-component.service';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css'],
  providers: [
    CalculationComponentService
  ],
  animations: [showAnimation]
})
export class CalculationComponent implements OnInit {

  ALGORITHM_CALCULATION_STATUS = ALGORITHM_CALCULATION_STATUS;

  constructor(
    public calculationComponentService: CalculationComponentService,
    private _matDialog: MatDialog,
    public configureApiCallService: ConfigureApiCallService
  ) { }

  configureAPICall() {
    this._matDialog.open(ApiCallConfiguratorDialogComponent, {
      panelClass: 'no-padding-dialog'
    });
  }

  ngOnInit(): void {
  }

}
