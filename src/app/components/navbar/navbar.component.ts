import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { selectSolutions } from 'src/lib/storage-manager-store/store/selectors/i-solution.selectors';
import * as fromISolutionState from 'src/lib/storage-manager-store/store/reducers/solution.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentApplicationVersion = (environment as any).appVersion;

  solutionCount$ = this._solutionStore
    .select(selectSolutions)
    .pipe(map((solutions) => solutions?.length ?? 0));

  private _limitedHeight = new BehaviorSubject<boolean>(false);
  limitedHeight$ = this._limitedHeight.asObservable();

  constructor(
    public router: Router,
    private _solutionStore: Store<fromISolutionState.State>
  ) { }

  ngOnInit(): void { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.validateClient();
  }

  validateClient() {
    this._limitedHeight.next(window.innerHeight <= 500);
  }
}
