import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { selectHasDeterminingProcedures, selectGlobalProcedureProgress, selectHasPendingProcedures } from './store/selectors/i-pending-procedure.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'storage-manager';

  private _loadingRoute: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loadingRoute$ = this._loadingRoute.asObservable();

  public canProvideDeterminateProgress$ = this._store.select(selectHasDeterminingProcedures);
  public globalProcedureProgress$ = this._store.select(selectGlobalProcedureProgress);
  public hasPendingTasks$ = this._store.select(selectHasPendingProcedures);

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _store: Store
  ) { }

  public ngOnInit(): void {
    if (localStorage.getItem('cookie_consent') !== 'true') {
      this._snackBar.open(
        'In addition to cookies which are necessary for the proper functioning of websites, we use cookies on your browser to improve your experience.', 'Consent', { horizontalPosition: 'right', verticalPosition: 'top' })
        .afterDismissed()
        .subscribe(() => localStorage.setItem('cookie_consent', 'true'));
    }
    this._router
      .events
      .subscribe(event => {

        if (event instanceof NavigationStart) this._loadingRoute.next(true);
        else if (event instanceof NavigationEnd) this._loadingRoute.next(false);

      });
  }

}
