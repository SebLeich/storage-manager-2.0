import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { selectSolutionNavItemHighlighted } from 'src/app/store/selectors/application.selectors';
import { resetSolutionNavItem } from 'src/app/store/actions/application.actions';
import { selectSolutions } from '@smgr/store';

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
  public location = location;

  constructor(private _router: Router, private _store: Store) { }

  @HostListener('window:resize', ['$event'])
  private _onResize(event: Event) {
    this.validateClient();
  }

  public gotoVisualizer(){
    this._store.dispatch(resetSolutionNavItem());
    this._router.navigate(['/visualizer']);
  }

  public validateClient() {
    this._limitedHeight.next(window.innerHeight <= 500);
  }
}
