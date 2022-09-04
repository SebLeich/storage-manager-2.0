import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { selectCurrentSolution } from 'src/app/store/selectors/i-solution.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentSolutionAvailable$ = this._solutionStore.select(selectCurrentSolution);

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

  validateClient(){
    this._limitedHeight.next(window.innerHeight <= 500);
  }

}
