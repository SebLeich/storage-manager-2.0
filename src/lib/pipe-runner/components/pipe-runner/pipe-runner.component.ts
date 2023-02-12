import { Component, EnvironmentInjector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, debounceTime, filter, map, scan, Subscription, distinctUntilChanged, NEVER, delay, startWith, BehaviorSubject, firstValueFrom } from 'rxjs';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { ActivatedRoute, Router } from '@angular/router';
import { selectPipelineByName } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import { selectPipelineActionAndSuccessors, selectPipelineActionByPipelineName } from 'src/lib/pipeline-store/store/selectors/pipeline-action.selectors';
import { updateIPipelineActionStatus, updateIPipelineActionStatuses } from 'src/lib/pipeline-store/store/actions/pipeline-action-status.action';
import { selectPipelineActionStates } from 'src/lib/pipeline-store/store/selectors/pipeline-action-status.selectors';
import { Subject } from 'rxjs/internal/Subject';
import moment from 'moment';
import * as ThreeJS from 'three';
import { VisualizationService } from 'src/lib/visualization/services/visualization.service';
import { MatTabGroup } from '@angular/material/tabs';
import { ISolutionWrapper } from 'src/lib/storage-manager-store/interfaces/solution-wrapper.interface';
import { addGroups } from 'src/lib/storage-manager-store/store/actions/group.actions';
import { showAnimation } from 'src/lib/shared/animations/show';
import { addSolution, setCurrentSolution } from 'src/lib/storage-manager-store/store/actions/solution.actions';
import { setIPipelineSolutionReference } from 'src/lib/pipeline-store/store/actions/pipeline.actions';
import { selectSolutionById } from 'src/lib/storage-manager-store/store/selectors/i-solution.selectors';
import { ISolution } from 'src/lib/storage-manager-store/interfaces/solution.interface';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in.animation';
import { highlightSolutionNavItem } from 'src/app/store/actions/application.actions';
import { setIPipelineActionSolution } from 'src/lib/pipeline-store/store/actions/pipeline-action.actions';

@Component({
  selector: 'app-pipe-runner',
  templateUrl: './pipe-runner.component.html',
  styleUrls: ['./pipe-runner.component.scss'],
  providers: [VisualizationService],
  animations: [fadeInAnimation, showAnimation]
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
  public pipelineName$ = this.pipeline$.pipe(map(pipeline => pipeline?.name));
  public solution$ = this.pipeline$.pipe(
    map(pipeline => {
      return pipeline?.solutionReference;
    }),
    filter(solutionReference => !!solutionReference),
    switchMap(solutionReference => this._store.select(selectSolutionById(solutionReference ?? null)))
  );
  public actions$ = this.pipeline$.pipe(
    switchMap(pipeline => {
      if (!pipeline) {
        return NEVER;
      }
      return this._store.select(selectPipelineActionByPipelineName(pipeline.name));
    }),
    map(actions => {
      let initialAction = actions.find(actions => actions!.isPipelineStart);
      let sortedActions = [initialAction], currentActions = [initialAction];
      while (currentActions.length > 0) {
        const successors = actions.filter(action => currentActions
          .flatMap(action => {
            const successors = [action?.onSuccess, action?.onError];
            return successors;
          })
          .filter(identifier => {
            return !!identifier;
          })
          .indexOf(action?.identifier) > -1);

        sortedActions.push(...successors);
        currentActions = successors;
      }
      return sortedActions;
    })
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

  public scene = new ThreeJS.Scene();
  public meshRegistry = [];

  private _subscriptions = new Subscription();

  constructor(private _store: Store, private _route: ActivatedRoute, private _router: Router, private _visualizationService: VisualizationService, private _environmentInjector: EnvironmentInjector) { }

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
    this._subscriptions.add(
      this.solution$.pipe(debounceTime(500)).subscribe(async solution => await this._updateScene(solution))
    );
  }

  public openVisualization = () => this._router.navigate(['/visualizer']);

  public async run() {
    const actions = await selectSnapshot(this.actions$);
    let solutionWrapper: ISolutionWrapper | null = null, injector: { [key: string]: any } = {};
    let currentAction = actions.find(action => action!.isPipelineStart);
    while (currentAction) {
      this._store.dispatch(updateIPipelineActionStatus(currentAction!.identifier, 'RUNNING'));
      try {
        await this._environmentInjector.runInContext(async () => {
          const result = await currentAction!.executableCode(injector);
          if (currentAction?.ouputParamName) {
            injector[currentAction.ouputParamName] = result;
          }
          if (currentAction!.outputMatchesPipelineOutput) {
            solutionWrapper = result;
            this._store.dispatch(setIPipelineActionSolution(currentAction!.identifier, solutionWrapper!));
            this._store.dispatch(addSolution({ solution: (solutionWrapper as ISolutionWrapper)!.solution }));
          }
          const representation = typeof solutionWrapper! === 'object' ? JSON.stringify(solutionWrapper) : solutionWrapper!;
          this._consoleOutputSections$$.next({
            message: `${moment().format('HH:mm:ss')}: ${representation}`,
            class: 'default'
          });
          this._store.dispatch(updateIPipelineActionStatus(currentAction!.identifier, 'SUCCEEDED'));

          const skippedAction = actions.find(action => action?.identifier === currentAction!.onError);
          if (skippedAction) {
            const actionAndSuccessors = await selectSnapshot(this._store.select(selectPipelineActionAndSuccessors(skippedAction!.identifier, 'onSuccess')));
            this._store.dispatch(updateIPipelineActionStatuses(actionAndSuccessors, 'SKIPPED'));
          }

          currentAction = actions.find(action => action?.identifier === currentAction!.onSuccess);
        });
      } catch (error) {
        this._consoleOutputSections$$.next({
          message: `${moment().format('HH:mm:ss')}: ${error}`,
          class: 'error'
        });
        this._store.dispatch(updateIPipelineActionStatus(currentAction!.identifier, 'FAILED'));
        if (!currentAction.onError) {
          throw (`the action ${currentAction.name} failed, but no error successor was defined!`);
        }

        const skippedAction = actions.find(action => action?.identifier === currentAction!.onSuccess);
        if (skippedAction) {
          const actionAndSuccessors = await selectSnapshot(this._store.select(selectPipelineActionAndSuccessors(skippedAction!.identifier, 'onError')));
          this._store.dispatch(updateIPipelineActionStatuses(actionAndSuccessors, 'SKIPPED'));
        }

        currentAction = actions.find(action => action?.identifier === currentAction!.onError);
      }
    }

    if (!solutionWrapper) {
      throw ('no solution found!');
    }

    await this.setOutput(solutionWrapper as ISolutionWrapper);
    this._store.dispatch(highlightSolutionNavItem());
  }

  public async setOutput(solutionWrapper: ISolutionWrapper) {
    const pipeName = await firstValueFrom(this.pipelineName$);
    this._store.dispatch(setCurrentSolution({ solution: solutionWrapper.solution }));
    this._store.dispatch(addGroups({ groups: (solutionWrapper as ISolutionWrapper).groups }));
    this._store.dispatch(setIPipelineSolutionReference(pipeName!, (solutionWrapper as ISolutionWrapper)!.solution.id));
  }

  private async _updateScene(solution: ISolution | undefined | null) {
    if (!solution) {
      return;
    }
    this._visualizationService.configureSolutionScene(solution, this.scene, '#ffffff');
    this.tabGroup.selectedIndex = 1;
  }

}
