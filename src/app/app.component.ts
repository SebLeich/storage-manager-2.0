import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'storage-manager';

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._snackBar.open('that application uses cookies', 'Cookies', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top' });
  }

}
