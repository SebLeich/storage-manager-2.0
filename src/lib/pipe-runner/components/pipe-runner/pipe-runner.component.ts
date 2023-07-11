import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  delay,
  startWith,
  BehaviorSubject,
  scan,
  merge,
  firstValueFrom,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  selectPipelines,
  selectSelectedPipeline,
} from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import moment from 'moment';
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

@Component({
  selector: 'app-pipe-runner',
  templateUrl: './pipe-runner.component.html',
  styleUrls: ['./pipe-runner.component.scss'],
  providers: [PipeRunnerService, VisualizationService],
  animations: [fadeInAnimation, showAnimation],
})
export class PipeRunnerComponent implements OnInit {
  @ViewChild('tabGroup', { static: true }) public tabGroup!: MatTabGroup;

  public consoleOutputSections$ = merge(
    this.pipeRunnerService.consoleOutput,
    this.pipeRunnerService.status$.pipe(
      map((status) => {
        return {
          message: `${moment().format(
            'HH:mm:ss'
          )}: status changed to ${status}`,
          class:
            status === 'Succeeded'
              ? 'success'
              : status === 'Errors occurred'
              ? 'error'
              : status === 'Running'
              ? 'primary'
              : 'default',
        };
      })
    )
  ).pipe(
    scan(
      (
        acc: { message: string; class: string }[],
        curr: { message: string; class: string }
      ) => {
        return [curr, ...acc];
      },
      []
    )
  );

  private _visualizationTabRendered$$ = new BehaviorSubject(false);
  public visualizationTabRendered$ = this._visualizationTabRendered$$.asObservable();

  public pipelineControl = new FormControl();
  public pipelines$ = this._store.select(selectPipelines);

  public scene = new ThreeJS.Scene();
  public meshRegistry = [];

  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
    private _router: Router,
    private _visualizationService: VisualizationService,
    public pipeRunnerService: PipeRunnerService,
    private _destroyRef: DestroyRef
  ) {}

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

  public openVisualization = () => this._router.navigate(['/visualizer']);

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
