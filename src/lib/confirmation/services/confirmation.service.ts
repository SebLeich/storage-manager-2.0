import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ConfirmationComponent } from '../components/confirmation/confirmation.component';
import { IConfirmationInput } from '../interfaces/confirmation-input.interface';

@Injectable()
export class ConfirmationService {

  constructor(private _matDialog: MatDialog) { }

  public requestConfirmation(headline: string, html: string): Promise<boolean> {
    const result = this._matDialog.open(ConfirmationComponent, {
      autoFocus: false,
      data: {
        headline: headline,
        html: html,
        maxWidth: 400
      } as IConfirmationInput
    });
    return lastValueFrom(result.afterClosed());
  }

}
