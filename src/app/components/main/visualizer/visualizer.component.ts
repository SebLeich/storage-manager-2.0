import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { selectedGoodEdgeColor } from 'src/app/globals';
import { NoSolutionDialogComponent } from '../../dialog/no-solution-dialog/no-solution-dialog.component';
import { VisualizerComponentService } from './visualizer-component-service';
import { selectCurrentSolution, selectSolutions } from 'src/app/store/selectors/i-solution.selectors';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { setCurrentSolution } from 'src/app/store/actions/i-solution.actions';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
  providers: [VisualizerComponentService],
  animations: [fadeInAnimation],
})
export class VisualizerComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('visualizerWrapper', { static: false }) set visualizerWrapperRef(ref: ElementRef<HTMLDivElement>) {
    if (!ref) {
      return;
    }
    this.visualizerComponentService.setVisualizerWrapper(ref);
  }

  public currentSolution$ = this._store.select(selectCurrentSolution);
  public hasCurrentSolution$ = this.currentSolution$.pipe(
    map((solution) => !!solution)
  );

  private _menuVisible = new BehaviorSubject<boolean>(true);
  private _userToggledMenu = new BehaviorSubject<boolean>(false);
  menuVisible$ = this._menuVisible.asObservable();

  private _displayDetails = new BehaviorSubject<boolean>(true);
  displayDetails$ = this._displayDetails.asObservable();

  displaySolution$ = this.menuVisible$.pipe(
    switchMap(() => timer(500).pipe(map(() => true), startWith(false)))
  );

  private _subscriptions = new Subscription();

  constructor(
    public visualizerComponentService: VisualizerComponentService,
    private _dialog: MatDialog,
    private _viewContainerRef: ViewContainerRef,
    private _store: Store
  ) { }

  public ngAfterViewInit(): void {
    this.validateClient();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.visualizerComponentService.dispose();
  }

  public ngOnInit(): void {
    this._subscriptions.add(
      ...[
        this.visualizerComponentService.resized$
          .pipe(
            switchMap(() =>
              this.visualizerComponentService.visualizerWrapper$.pipe(take(1))
            )
          )
          .subscribe((ref: ElementRef<HTMLDivElement>) => {
            this.visualizerComponentService.setSceneDimensions(
              ref.nativeElement.clientWidth,
              ref.nativeElement.clientHeight,
              true
            );
          }),

        this.menuVisible$.subscribe(() =>
          this.visualizerComponentService.triggerResizeEvent()
        ),
      ]
    );

    this._subscriptions.add(
      this.hasCurrentSolution$
        .pipe(
          filter((hasCurrentSolution) => !hasCurrentSolution),
          switchMap(() => this._store.select(selectSolutions)),
          take(1)
        )
        .subscribe((solutions) => {
          if (solutions.length > 0) {
            this._store.dispatch(setCurrentSolution({ solution: solutions[0] }));
          }
          this.showNoSolutionDialog();
        })
    );
  }

  showNoSolutionDialog() {
    this._dialog.open(NoSolutionDialogComponent, {
      panelClass: 'no-padding-dialog',
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
    });
  }

  async toggleMenu() {
    const menuVisible = await selectSnapshot(this._menuVisible);
    const userToggledMenu = await selectSnapshot(this._userToggledMenu);

    this._menuVisible.next(!menuVisible);
    this._userToggledMenu.next(!userToggledMenu);
  }

  @HostListener('window:resize', ['$event'])
  async onResize(event: Event) {
    this.visualizerComponentService.triggerResizeEvent();
    await this.validateClient();
  }

  @HostListener('document:keypress', ['$event'])
  onKeydown = (event: KeyboardEvent) =>
    this.visualizerComponentService.keydown(event);

  selectedGoodEdgeColor = selectedGoodEdgeColor;

  async validateClient() {
    const menuVisible = await selectSnapshot(this._menuVisible);
    const userToggledMenu = await selectSnapshot(this._userToggledMenu);
    const wideView = window.innerWidth >= 1000;

    this._displayDetails.next(wideView);
    this._menuVisible.next(wideView && !userToggledMenu);
  }
}
