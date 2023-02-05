import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map, scan, Subscription, distinctUntilChanged, NEVER, delay, startWith, BehaviorSubject } from 'rxjs';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { ActivatedRoute, Router } from '@angular/router';
import { selectPipelineByName } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import { selectPipelineActionByPipelineName } from 'src/lib/pipeline-store/store/selectors/pipeline-action.selectors';
import { updateIPipelineActionStatus } from 'src/lib/pipeline-store/store/actions/pipeline-action-status.action';
import { selectPipelineActionStates } from 'src/lib/pipeline-store/store/selectors/pipeline-action-status.selectors';
import { Subject } from 'rxjs/internal/Subject';
import moment from 'moment';
import * as ThreeJS from 'three';
import { VisualizationService } from 'src/lib/visualization/services/visualization.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ISolutionWrapper } from 'src/lib/storage-manager-store/interfaces/solution-wrapper.interface';
import { addGroups } from 'src/lib/storage-manager-store/store/actions/group.actions';

@Component({
  selector: 'app-pipe-runner',
  templateUrl: './pipe-runner.component.html',
  styleUrls: ['./pipe-runner.component.scss'],
  providers: [VisualizationService]
})
export class PipeRunnerComponent implements OnDestroy, OnInit {

  @ViewChild('tabGroup', { static: true }) public tabGroup!: MatTabGroup;

  private _visualizationTabRendered$$ = new BehaviorSubject(false);
  public visualizationTabRendered$ = this._visualizationTabRendered$$.asObservable();

  private _consoleOutputSections$$ = new Subject<{ message: string, class: string }>();
  public consoleOutputSections$ = this._consoleOutputSections$$.pipe(scan((acc: { message: string, class: string }[], curr: { message: string, class: string }) => {
    return [curr, ...acc];
  }, []));

  public pipeline$ = this._route.queryParams.pipe(switchMap(queryParams => this._store.select(selectPipelineByName(queryParams.pipeline ?? 'myPipe'))));
  public actions$ = this.pipeline$.pipe(
    switchMap(pipeline => {
      if (!pipeline) {
        return NEVER;
      }
      return this._store.select(selectPipelineActionByPipelineName(pipeline.name));
    }),
    map(actions => actions.sort((a, b) => a!.sequenceNumber > b!.sequenceNumber ? 1 : -1))
  );
  public status$ = this.actions$.pipe(
    switchMap(actions => this._store.select(selectPipelineActionStates(actions.map(action => action!.identifier)))),
    map(states => {
      if (states.every(status => status!.status === 'INITIALIZED')) {
        return 'Ready for run';
      }
      if (states.every(status => status!.status === 'SUCCEEDED' || status!.status === 'SKIPPED')) {
        return 'Succeeded';
      }
      if (states.some(status => status!.status === 'FAILED')) {
        return 'Errors occurred';
      }
      return 'Running';
    }),
    distinctUntilChanged((prev, curr) => prev === curr)
  );
  public solution: ISolutionWrapper | null = null;

  public scene = new ThreeJS.Scene();
  public meshRegistry = [];

  private _subscriptions = new Subscription();

  constructor(private _store: Store, private _route: ActivatedRoute, private _router: Router, private _visualizationService: VisualizationService,) { }

  public designPipeline(): void {
    this._router.navigate(['/data-pipeline-designer']);
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    this._subscriptions.add(this.status$.subscribe(status => this._consoleOutputSections$$.next({
      message: `${moment().format('HH:mm:ss')}: status changed to ${status}`,
      class: status === 'Succeeded' ? 'success' : status === 'Errors occurred' ? 'error' : status === 'Running' ? 'primary' : 'default'
    })));
    this._subscriptions.add(
      this.tabGroup.selectedTabChange.pipe(
        map(event => event.tab.textLabel === 'visualization'),
        delay(500),
        startWith(false),
        distinctUntilChanged()
      ).subscribe(value => this._visualizationTabRendered$$.next(value))
    );
  }

  public async run() {
    const actions = await selectSnapshot(this.actions$);
    let index = 0;
    let currentAction = actions![index];
    let result: ISolutionWrapper;
    while (currentAction) {
      this._store.dispatch(updateIPipelineActionStatus(currentAction.identifier, 'RUNNING'));
      try {
        result = await currentAction.executableCode();
        const representation = typeof result === 'object' ? JSON.stringify(result) : result;
        this._consoleOutputSections$$.next({
          message: `${moment().format('HH:mm:ss')}: ${representation}`,
          class: 'default'
        });
        this._store.dispatch(updateIPipelineActionStatus(currentAction.identifier, 'SUCCEEDED'));
      } catch (error) {
        this._consoleOutputSections$$.next({
          message: `${moment().format('HH:mm:ss')}: ${error}`,
          class: 'error'
        });
        this._store.dispatch(updateIPipelineActionStatus(currentAction.identifier, 'FAILED'));
      }

      index++;
      currentAction = actions![index];
    }
    this._store.dispatch(addGroups({ groups: result!.groups }));
    this.solution = result!;
    await this._updateScene();
    this.tabGroup.selectedIndex = 1;
  }

  private async _updateScene() {
    this._visualizationService.configureSolutionScene(this.solution!.solution, this.scene, '#ffffff');
  }

}
