import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { showAnimation } from 'src/app/animations';
import { Solution } from 'src/app/classes';
import { selectedGoodEdgeColor } from 'src/app/globals';
import { DataService } from 'src/app/services/data.service';
import { NoSolutionDialogComponent } from '../../dialog/no-solution-dialog/no-solution-dialog.component';
import { VisualizerComponentService } from './visualizer-component-service';

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

  private _subscriptions: Subscription[] = [];

  constructor(
    public visualizerComponentService: VisualizerComponentService,
    private _dataService: DataService,
    private _dialog: MatDialog,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngAfterViewInit(): void {
    this.validateClient();
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
    this.visualizerComponentService.dispose();
  }

  ngOnInit(): void {
    this._subscriptions.push(...[
      this.visualizerComponentService.resized$.pipe(switchMap(() => this.visualizerComponentService.visualizerWrapper$.pipe(take(1)))).subscribe((ref: ElementRef<HTMLDivElement>) => {
        this.visualizerComponentService.setSceneDimensions(ref.nativeElement.clientWidth, ref.nativeElement.clientHeight, true);
      }),
      this._dataService.currentSolution$
        .pipe(filter((solution: Solution) => solution === null ? true : false))
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
  onKeydown = (event) => this.visualizerComponentService.keydown(event);

  selectedGoodEdgeColor = selectedGoodEdgeColor;
  
  validateClient(){
    this._displayDetails.next(window.innerWidth >= 1000);
    this._menuVisible.next(window.innerWidth >= 1000);
  }
}
