import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmationInput } from '../../interfaces/confirmation-input.interface';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmationInput, private _ref: MatDialogRef<ConfirmationComponent>){}

  public abort(){
    this._ref.close(false);
  }

  public confirm(){
    this._ref.close(true);
  }

}
