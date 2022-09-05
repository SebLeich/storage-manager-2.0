import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { selectedGoodEdgeColor } from 'src/app/globals';
import { showAnimation } from 'src/lib/shared/animations/show';
import { NoSolutionDialogComponent } from '../../dialog/no-solution-dialog/no-solution-dialog.component';
import { VisualizerComponentService } from './visualizer-component-service';

import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';
import { selectCurrentSolution } from 'src/app/store/selectors/i-solution.selectors';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
  providers: [
    VisualizerComponentService
  ],
  animations: [showAnimation]
})
export class VisualizerComponent implements AfterViewInit, OnDestroy, OnInit {

  private _menuVisible = new BehaviorSubject<boolean>(true);
  menuVisible$ = this._menuVisible.asObservable();

  private _displayDetails = new BehaviorSubject<boolean>(true);
  displayDetails$ = this._displayDetails.asObservable();

  @ViewChild('visualizerWrapper', { static: false }) set visualizerWrapperRef(ref: ElementRef<HTMLDivElement>) {
    this.visualizerComponentService.setVisualizerWrapper(ref);
  }

  private _subscriptions = new Subscription();

  constructor(
    public visualizerComponentService: VisualizerComponentService,
    private _dialog: MatDialog,
    private _viewContainerRef: ViewContainerRef,
    private _solutionStore: Store<fromISolutionState.State>,
  ) { }

  ngAfterViewInit(): void {
    this.validateClient();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this.visualizerComponentService.dispose();
  }

  ngOnInit(): void {
    this._subscriptions.add(...[
      this.visualizerComponentService.resized$.pipe(switchMap(() => this.visualizerComponentService.visualizerWrapper$.pipe(take(1)))).subscribe((ref: ElementRef<HTMLDivElement>) => {
        this.visualizerComponentService.setSceneDimensions(ref.nativeElement.clientWidth, ref.nativeElement.clientHeight, true);
      }),
      this._solutionStore.select(selectCurrentSolution)
        .pipe(filter((solution) => !solution))
        .subscribe(() => this.showNoSolutionDialog()),
      this.menuVisible$.subscribe(() => this.visualizerComponentService.triggerResizeEvent())
    ]);
  }

  showNoSolutionDialog() {
    this._dialog.open(NoSolutionDialogComponent, {
      panelClass: 'no-padding-dialog',
      disableClose: true,
      viewContainerRef: this._viewContainerRef
    });
  }

  toggleMenu = () => this._menuVisible.next(!this._menuVisible.value);

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.visualizerComponentService.triggerResizeEvent();
    this.validateClient();
  }

  @HostListener('document:keypress', ['$event'])
  onKeydown = (event: KeyboardEvent) => this.visualizerComponentService.keydown(event);

  selectedGoodEdgeColor = selectedGoodEdgeColor;

  validateClient() {
    this._displayDetails.next(window.innerWidth >= 1000);
    this._menuVisible.next(window.innerWidth >= 1000);
  }
}
