import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.scss']
})
export class UserInputComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public inputs: { name: string, type: 'number' | 'string' | 'boolean' }[]) { }

}
