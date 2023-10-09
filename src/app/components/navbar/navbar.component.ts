import { ChangeDetectionStrategy, Component, HostListener, Inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { selectSolutionNavItemHighlighted } from 'src/app/store/selectors/application.selectors';
import { resetSolutionNavItem } from 'src/app/store/actions/application.actions';
import { selectSolutions } from '@smgr/store';
import { APP_BASE_HREF } from '@angular/common';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  public solutionCount$ = this._store.select(selectSolutions).pipe(map((solutions) => solutions?.length ?? 0));
  public solutionNavItemHighlighted$ = this._store.select(selectSolutionNavItemHighlighted);
  public pathname$ = this._router.events.pipe(
    filter((event) => event instanceof NavigationEnd), 
    map(() => this.location.pathname)
  );

  public currentApplicationVersion = (environment as unknown as { appVersion?: string }).appVersion;
  public limitedHeight = signal(false);
  public location = location;

  constructor(@Inject(APP_BASE_HREF) public baseHref: string, private _router: Router, private _store: Store) { }

  public ngOnInit(): void {
    this.validateClient();
  }

  public gotoVisualizer() {
    this._store.dispatch(resetSolutionNavItem());
    this._router.navigate(['/visualizer']);
  }

  public validateClient = () => this.limitedHeight.set(window.innerHeight < 600);

  @HostListener('window:resize', ['$event'])
  private _() {
    this.validateClient();
  }
}
