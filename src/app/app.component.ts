import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'storage-manager';

  private _loadingRoute: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loadingRoute$ = this._loadingRoute.asObservable();

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._snackBar.open('that application uses cookies', 'Cookies', { duration: 2000, horizontalPosition: 'right', verticalPosition: 'top' });
    this._router
      .events
      .subscribe(event => {

        if (event instanceof NavigationStart) this._loadingRoute.next(true);
        else if (event instanceof NavigationEnd) this._loadingRoute.next(false);

      });
  }

}
