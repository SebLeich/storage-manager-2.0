import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { selectSolutions } from 'src/lib/storage-manager-store/store/selectors/i-solution.selectors';
import * as fromISolutionState from 'src/lib/storage-manager-store/store/reducers/solution.reducers';
import { selectSolutionNavItemHighlighted } from 'src/app/store/selectors/application.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public currentApplicationVersion = (environment as any).appVersion;
  public solutionCount$ = this._store.select(selectSolutions).pipe(map((solutions) => solutions?.length ?? 0));
  public solutionNavItemHighlighted$ = this._store.select(selectSolutionNavItemHighlighted);

  private _limitedHeight = new BehaviorSubject<boolean>(false);
  public limitedHeight$ = this._limitedHeight.asObservable();

  constructor(public router: Router, private _store: Store) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.validateClient();
  }

  public validateClient() {
    this._limitedHeight.next(window.innerHeight <= 500);
  }
}
