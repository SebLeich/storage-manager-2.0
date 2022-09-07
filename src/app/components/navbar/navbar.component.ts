import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map } from 'rxjs';

import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { selectSolutions } from 'src/app/store/selectors/i-solution.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  solutionCount$ = this._solutionStore.select(selectSolutions).pipe(map(solutions => solutions?.length ?? 0));

  private _limitedHeight = new BehaviorSubject<boolean>(false);
  limitedHeight$ = this._limitedHeight.asObservable();

  constructor(
    public router: Router,
    private _solutionStore: Store<fromISolutionState.State>,
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.validateClient();
  }

  validateClient() {
    this._limitedHeight.next(window.innerHeight <= 500);
  }

}
