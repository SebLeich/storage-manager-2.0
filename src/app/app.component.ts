import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, interval } from 'rxjs';
import { IProcedure } from './interfaces/i-pending-procedure.interface';
import { announceProcedure, updateProcedure } from './store/actions/i-pending-procedure.actions';
import { selectCanProvideDeterminateProgress, selectGlobalProcedureProgress, selectHasPendingTasks } from './store/selectors/i-pending-procedure.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'storage-manager';

  private _loadingRoute: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loadingRoute$ = this._loadingRoute.asObservable();

  public canProvideDeterminateProgress$ = this._store.select(selectCanProvideDeterminateProgress);
  public globalProcedureProgress$ = this._store.select(selectGlobalProcedureProgress);
  public hasPendingTasks$ = this._store.select(selectHasPendingTasks);

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _store: Store
  ) { }

  public ngOnInit(): void {
    let procedure = { 'guid': 'test', 'progress': 0 } as IProcedure;
    this._store.dispatch(announceProcedure({ procedure }));
    interval(1000).subscribe(() => {
      procedure = { ...procedure, progress: procedure.progress! + 1 };
      this._store.dispatch(updateProcedure({ procedure }));
      console.log(procedure);
    });
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
