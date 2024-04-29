import { Component, DestroyRef, OnInit, ViewChild, effect } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, map, distinctUntilChanged, delay, startWith, BehaviorSubject, firstValueFrom, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { selectPipelines, selectSelectedPipeline } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import { v4 as generateGuid } from 'uuid';
import * as ThreeJS from 'three';
import { VisualizationService } from 'src/lib/visualization/services/visualization.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ISolution } from '@smgr/interfaces';
import { FormControl } from '@angular/forms';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in.animation';
import { showAnimation } from 'src/lib/shared/animations/show';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { setSelectedPipeline } from '@/lib/pipeline-store/store/actions/pipeline.actions';
import { PipeRunnerService } from './services/pipe-runner.service';
import { showListAnimation } from '@/lib/shared/animations/show-list';
import { ConsoleService } from '@/lib/console/services/console.service';
import { LogLevel } from '@/lib/shared/types/log-level.type';
import { selectSnapshot } from '@/lib/process-builder/globals/select-snapshot';

@Component({
  selector: 'app-pipe-runner',
  templateUrl: './pipe-runner.component.html',
  styleUrls: ['./pipe-runner.component.scss'],
  providers: [PipeRunnerService, VisualizationService],
  animations: [fadeInAnimation, showAnimation, showListAnimation],
})
export class PipeRunnerComponent implements OnInit {
  @ViewChild('tabGroup', { static: true }) public tabGroup!: MatTabGroup;

  public statusEffectRef = effect(() => {
    const status = this.pipeRunnerService.status();
    const level: LogLevel = status === 'Succeeded' ? 'success' : status === 'Errors occurred' ? 'error' : 'info';
    const date = new Date();
    this.consoleService.log({
      channel: 'pipe-runner',
      id: generateGuid(),
      level: level,
      message: `${date.toDateString()}: status changed to ${status}`,
      timeStamp: date
    });
  }, { allowSignalWrites: true });

  private _visualizationTabRendered$$ = new BehaviorSubject(false);
  public visualizationTabRendered$ = this._visualizationTabRendered$$.asObservable();

  public pipelineControl = new FormControl();
  public pipelines$ = this._store.select(selectPipelines);

  public hideActions = false;

  public initializationDate = new Date();
  public scene = new ThreeJS.Scene();
  public meshRegistry = [];
  public isRunning = false;

  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
    private _router: Router,
    private _visualizationService: VisualizationService,
    public pipeRunnerService: PipeRunnerService,
    public consoleService: ConsoleService,
    private _destroyRef: DestroyRef
  ) { }

  public designPipeline(): void {
    this._router.navigate(['/data-pipeline-designer']);
  }

  public ngOnInit(): void {
    this.pipeRunnerService.selectedPipelineId$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((pipeline) => this.pipelineControl.setValue(pipeline));
    this.tabGroup.selectedTabChange
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((event) => event.tab.textLabel === 'visualization'),
        delay(500),
        startWith(false),
        distinctUntilChanged()
      )
      .subscribe((value) => this._visualizationTabRendered$$.next(value));

    this.pipeRunnerService.solution$
      .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(500))
      .subscribe(async (solution) => await this._updateScene(solution));

    this.pipelineControl.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((pipeline: string) => {
      this._router.navigate(['/pipe-runner'], { relativeTo: this._route, queryParams: { pipeline: pipeline } });
      this._store.dispatch(setSelectedPipeline(pipeline));
    });

    this._tryInitiallySetLastPipeline();
  }

  public async renameCurrentPipeline(pipelineName: string) {
    await this.pipeRunnerService.renameCurrentPipeline(pipelineName, this.consoleService, 'pipe-runner');
  }

  public async runPipeline() {
    this.isRunning = true;
    await selectSnapshot(timer(10));
    await this.pipeRunnerService.run(this.consoleService, 'pipe-runner');
    await selectSnapshot(timer(10));
    this.isRunning = false;
  }

  public openVisualization = () => this._router.navigate(['/visualizer']);
  public toggleViewMode = () => this.hideActions = !this.hideActions;

  private async _updateScene(solution: ISolution | undefined | null) {
    if (!solution) {
      return;
    }
    this._visualizationService.configureSolutionScene(
      solution,
      this.scene,
      '#ffffff'
    );
    this.tabGroup.selectedIndex = 1;
  }

  private async _tryInitiallySetLastPipeline() {
    const currentPipeline = this._route.snapshot.queryParams['pipeline'];
    if (currentPipeline) return;

    const lastSelectedPipeline = await firstValueFrom(this._store.select(selectSelectedPipeline));
    if (!lastSelectedPipeline) return;

    this._router.navigate([], {
      queryParams: { pipeline: lastSelectedPipeline },
      queryParamsHandling: 'merge',
    });
  }
}
