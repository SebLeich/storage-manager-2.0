import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { delay, filter, map, scan, startWith, switchMap, take } from 'rxjs/operators';
import { selectedGoodEdgeColor } from 'src/app/globals';
import { NoSolutionDialogComponent } from '../../dialog/no-solution-dialog/no-solution-dialog.component';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in.animation';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { ISolution } from '@smgr/interfaces';
import { VisualizerComponentService } from './visualizer-component.service';
import { IVisualizerContextService, VISUALIZER_CONTEXT } from 'src/app/interfaces/i-visualizer-context.service';
import { SceneVisualizationComponent } from 'src/lib/visualization/components/scene-visualization/scene-visualization.component';
import { selectCurrentSolution, setCurrentSolution, selectSolutions } from '@smgr/store';
import { VisualizationService } from '@/lib/visualization/services/visualization/visualization.service';

import * as ThreeJS from 'three';



@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss'],
  providers: [
    VisualizationService,
    { provide: VISUALIZER_CONTEXT, useClass: VisualizerComponentService }
  ],
  animations: [fadeInAnimation],
})
export class VisualizerComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(SceneVisualizationComponent, { static: false }) private _visualization!: SceneVisualizationComponent;

  public currentSolution$ = this._store.select(selectCurrentSolution);
  public hasCurrentSolution$ = this.currentSolution$.pipe(
    map((solution) => !!solution)
  );

  public selectedGoodPanelExpanded: boolean = false;

  private _menuVisible = new BehaviorSubject<boolean>(true);
  private _userToggledMenu = new BehaviorSubject<boolean>(false);
  public menuVisible$ = this._menuVisible.asObservable();
  public menuToggling$ = this._menuVisible.pipe(
    switchMap(
      () => timer(200)
        .pipe(
          map(() => false),
          startWith(true)
        )
    ),
  );

  private _displayDetails = new BehaviorSubject<boolean>(true);
  public displayDetails$ = this._displayDetails.asObservable();

  public scene$ = this.currentSolution$.pipe(
    scan(
      (scene: ThreeJS.Scene, solution: ISolution | null) => {
        this._visualizationService.configureSolutionScene(solution!, scene, 'rgb(238,238,238)')
        return scene;
      },
      new ThreeJS.Scene()
    )
  );

  private _subscriptions = new Subscription();

  constructor(
    @Inject(VISUALIZER_CONTEXT) public visualizerComponentService: IVisualizerContextService,
    private _visualizationService: VisualizationService,
    private _dialog: MatDialog,
    private _viewContainerRef: ViewContainerRef,
    private _store: Store
  ) { }

  public ngAfterViewInit(): void {
    this.validateClient();
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    this._subscriptions.add(this.menuToggling$.pipe(filter(toggling => !toggling), delay(1)).subscribe(() => this._visualization?.updateSize()));

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
          } else {
            this._showNoSolutionDialog();
          }
        })
    );

    this._subscriptions.add(this.visualizerComponentService.selectedGood$.pipe(filter(good => !!good)).subscribe(() => this.selectedGoodPanelExpanded = true));
  }

  private _showNoSolutionDialog() {
    this._dialog.open(NoSolutionDialogComponent, {
      panelClass: 'no-padding-dialog',
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
    });
  }

  public async toggleMenu() {
    const menuVisible = await selectSnapshot(this._menuVisible);
    const userToggledMenu = await selectSnapshot(this._userToggledMenu);

    this._menuVisible.next(!menuVisible);
    this._userToggledMenu.next(!userToggledMenu);
  }

  public selectedGoodEdgeColor = selectedGoodEdgeColor;

  public async validateClient() {
    const userToggledMenu = await selectSnapshot(this._userToggledMenu);
    const wideView = window.innerWidth >= 1000;

    this._displayDetails.next(wideView);
    this._menuVisible.next(wideView && !userToggledMenu);
  }
}
