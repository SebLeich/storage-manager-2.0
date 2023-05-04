import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, map, Subscription, distinctUntilChanged, delay, startWith, BehaviorSubject, scan, merge } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { selectPipelines } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import moment from 'moment';
import * as ThreeJS from 'three';
import { VisualizationService } from 'src/lib/visualization/services/visualization.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ISolution } from '@smgr/interfaces';
import { FormControl } from '@angular/forms';
import { PipeRunnerService } from './pipe-runner.service';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in.animation';
import { showAnimation } from 'src/lib/shared/animations/show';

@Component({
  selector: 'app-pipe-runner',
  templateUrl: './pipe-runner.component.html',
  styleUrls: ['./pipe-runner.component.scss'],
  providers: [PipeRunnerService, VisualizationService],
  animations: [fadeInAnimation, showAnimation]
})
export class PipeRunnerComponent implements OnDestroy, OnInit {

  @ViewChild('tabGroup', { static: true }) public tabGroup!: MatTabGroup;

  public consoleOutputSections$ = merge(this.pipeRunnerService.consoleOutput, this.pipeRunnerService.status$.pipe(map(status => {
    return {
      message: `${moment().format('HH:mm:ss')}: status changed to ${status}`,
      class: status === 'Succeeded' ? 'success' : status === 'Errors occurred' ? 'error' : status === 'Running' ? 'primary' : 'default'
    };
  }))).pipe(scan((acc: { message: string, class: string }[], curr: { message: string, class: string }) => {
    return [curr, ...acc];
  }, []));

  private _visualizationTabRendered$$ = new BehaviorSubject(false);
  public visualizationTabRendered$ = this._visualizationTabRendered$$.asObservable();

  public pipelineControl = new FormControl();
  public pipelines$ = this._store.select(selectPipelines);

  public scene = new ThreeJS.Scene();
  public meshRegistry = [];

  private _subscriptions = new Subscription();

  constructor(private _store: Store, private _route: ActivatedRoute, private _router: Router, private _visualizationService: VisualizationService, public pipeRunnerService: PipeRunnerService) { }

  public blurElement(element: HTMLElement, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    element.blur();
  }

  public designPipeline(): void {
    this._router.navigate(['/data-pipeline-designer']);
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    this._subscriptions.add(this.pipeRunnerService.selectedPipeline$.subscribe(pipeline => this.pipelineControl.setValue(pipeline)));
    this._subscriptions.add(
      this.tabGroup.selectedTabChange.pipe(
        map(event => event.tab.textLabel === 'visualization'),
        delay(500),
        startWith(false),
        distinctUntilChanged()
      ).subscribe(value => this._visualizationTabRendered$$.next(value))
    );
    this._subscriptions.add(this.pipeRunnerService.solution$.pipe(debounceTime(500)).subscribe(async solution => await this._updateScene(solution)));
    this._subscriptions.add(this.pipelineControl.valueChanges.subscribe(pipeline => this._router.navigate(['/pipe-runner'], {
      relativeTo: this._route,
      queryParams: {
        pipeline: pipeline
      }
    })));
  }

  public openVisualization = () => this._router.navigate(['/visualizer']);

  private async _updateScene(solution: ISolution | undefined | null) {
    if (!solution) {
      return;
    }
    this._visualizationService.configureSolutionScene(solution, this.scene, '#ffffff');
    this.tabGroup.selectedIndex = 1;
  }

}
