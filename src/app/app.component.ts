import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, NavigationSkipped, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, map, shareReplay } from 'rxjs';
import { selectGlobalProcedureProgress, selectHasDeterminingProcedures, selectHasPendingProcedures } from '@procedure';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public loadingRoute$ = this._router.events.pipe(
    filter(event => event instanceof NavigationStart || event instanceof NavigationEnd || event instanceof NavigationSkipped),
    map(event => event instanceof NavigationStart),
    shareReplay(1)
  );

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
  }

}
