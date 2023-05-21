import { ProcessBuilderRepository } from '@/lib/core/process-builder-repository';
import { mapIParamsInterfaces } from '@/lib/process-builder/extensions/rxjs/map-params-interfaces.rxjs';
import { selectIParams } from '@/lib/process-builder/store/selectors';
import { AllInOneRowSolver, StartLeftBottomSolver, SuperFloSolver } from '@/lib/storage-manager/solvers';
import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ISolutionWrapper } from '@smgr/interfaces';
import { addGroups, addSolution, selectSolutionById, setCurrentSolution } from '@smgr/store';
import moment from 'moment';
import * as rxjs from 'rxjs';
import { highlightSolutionNavItem } from 'src/app/store/actions/application.actions';
import { IPipelineAction } from 'src/lib/pipeline-store/interfaces/pipeline-action.interface';
import { updateIPipelineActionStatus, updateIPipelineActionStatuses } from 'src/lib/pipeline-store/store/actions/pipeline-action-status.action';
import { setIPipelineActionSolution } from 'src/lib/pipeline-store/store/actions/pipeline-action.actions';
import { renameIPipeline, setIPipelineSolutionReference } from 'src/lib/pipeline-store/store/actions/pipeline.actions';
import { selectPipelineActionStates } from 'src/lib/pipeline-store/store/selectors/pipeline-action-status.selectors';
import { selectPipelineActionAndSuccessors, selectPipelineActionByPipelineName } from 'src/lib/pipeline-store/store/selectors/pipeline-action.selectors';
import { selectPipelineByName } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

@Injectable()
export class PipeRunnerService {

  public consoleOutput = new EventEmitter<{ message: string, class: string }>();

  public selectedPipeline$ = this._route.queryParams.pipe(rxjs.map(queryParam => queryParam.pipeline), rxjs.filter(pipeline => !!pipeline));
  public pipeline$ = this.selectedPipeline$.pipe(rxjs.switchMap(pipeline => this._store.select(selectPipelineByName(pipeline))));
  public pipelineName$ = this.pipeline$.pipe(rxjs.map(pipeline => pipeline?.name));
  public solution$ = this.pipeline$.pipe(
    rxjs.map(pipeline => {
      return pipeline?.solutionReference;
    }),
    rxjs.filter(solutionReference => !!solutionReference),
    rxjs.switchMap(solutionReference => this._store.select(selectSolutionById(solutionReference ?? null)))
  );
  public actions$ = this.pipeline$.pipe(
    rxjs.switchMap(pipeline => {
      if (!pipeline) {
        return rxjs.NEVER;
      }
      return this._store.select(selectPipelineActionByPipelineName(pipeline.name));
    }),
    rxjs.map(actions => {
      const initialAction = actions.find(actions => actions?.isPipelineStart), sortedActions = [initialAction];
      let currentActions = [initialAction];

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

      return sortedActions.filter(action => action);
    })
  );
  public status$ = this.actions$.pipe(
    rxjs.switchMap((actions) => this._store.select(selectPipelineActionStates(actions.map(action => action?.identifier).filter(action => action ? true : false) as string[]))),
    rxjs.map(states => {
      if (states.every(status => status.status === 'INITIALIZED')) {
        return 'Ready for run';
      }
      if (states.every(status => status.status === 'SUCCEEDED' || status.status === 'SKIPPED')) {
        return 'Succeeded';
      }
      if (states.some(status => status.status === 'FAILED')) {
        return 'Errors occurred';
      }
      return 'Running';
    }),
    rxjs.distinctUntilChanged((prev, curr) => prev === curr)
  );
  public inputParams$ = this._store.select(selectIParams()).pipe(
    rxjs.shareReplay(1),
    rxjs.map(inputParams => inputParams ?? []),
    mapIParamsInterfaces(this._store),
    rxjs.map(inputs => {
      return inputs.reduce((prev, curr) => {
        if (curr.defaultValue) {
          prev[curr.normalizedName] = curr.defaultValue;
        } else {
          const dummyValue = ProcessBuilderRepository.createPseudoObjectFromIParam(curr);
          prev[curr.normalizedName] = dummyValue;
        }

        return prev;
      }, {} as { [key: string]: object | string | number })
    })
  );

  constructor(private _router: Router, private _route: ActivatedRoute, private _store: Store, public httpClient: HttpClient, private _environmentInjector: EnvironmentInjector, private _snackBar: MatSnackBar) { }

  public async renameCurrentPipeline(updatedName: string) {
    const currentPipelineName = await selectSnapshot(this.pipelineName$);
    if (typeof currentPipelineName === 'string' && updatedName !== currentPipelineName) {
      this._store.dispatch(renameIPipeline(currentPipelineName, updatedName));
      this._router.navigate(['/pipe-runner'], {
        relativeTo: this._route,
        queryParams: {
          pipeline: updatedName
        }
      });
      this._snackBar.open(`the pipe was successfully renamed to ${updatedName}`, 'ok', { duration: 2000 });
    }
  }

  public async run() {
    this.consoleOutput.emit({ message: `--------------- new run ---------------`, class: 'default' });
    const actions = (await selectSnapshot(this.actions$)).filter(action => action ? true : false) as IPipelineAction[],
      injector: { [key: string]: unknown } = {},
      params = await rxjs.firstValueFrom(this.inputParams$);

    const paramNames = Object.keys(params);

    let solutionWrapper: ISolutionWrapper | null = null,
      currentAction = actions.find(action => action.isPipelineStart);

    while (currentAction) {
      this._store.dispatch(updateIPipelineActionStatus(currentAction.identifier, 'RUNNING'));

      try {
        const console = {
          log: (...args: (string|number|object)[]) => {
            args.forEach(arg => {
              const stringified = typeof arg === 'object'? JSON.stringify(arg): arg.toString();
              this.consoleOutput.next({
                message: `${moment().format('HH:mm:ss')}: ${stringified}`,
                class: 'default'
              });
            });
          }
        }
        const solvers = [StartLeftBottomSolver, AllInOneRowSolver, SuperFloSolver];
        const rxjsElements = Object.keys(rxjs) as (keyof typeof rxjs)[];
        const mainMethodStart = currentAction?.executableCode?.indexOf('async () => {') ?? 0;
        const executableCode = currentAction?.executableCode?.substring(mainMethodStart) ?? undefined;
        const executableFunction = new Function('console', 'httpClient', ...solvers.map(solver => new solver().constructor.name), ...rxjsElements, ...paramNames, executableCode ? `return ${executableCode};` : 'return undefined;');
        const result = await executableFunction(
          console,
          this.httpClient,
          ...solvers,
          ...rxjsElements.map(element => rxjs[element]),
          ...paramNames.map(paramName => typeof injector[paramName] === 'undefined' ? params[paramName] : injector[paramName])
        )();

        if (currentAction?.ouputParamName) {
          injector[currentAction.ouputParamName] = result;
        }

        if (currentAction!.outputMatchesPipelineOutput) {
          solutionWrapper = result as ISolutionWrapper;
          this._store.dispatch(setIPipelineActionSolution(currentAction!.identifier, solutionWrapper!));
          this._store.dispatch(addSolution({ solution: (solutionWrapper as ISolutionWrapper)!.solution }));
        }

        const representation = typeof solutionWrapper === 'object' ? JSON.stringify(result) : result;
        this.consoleOutput.emit({
          message: `${moment().format('HH:mm:ss')}: ${representation}`,
          class: 'default'
        });
        this._store.dispatch(updateIPipelineActionStatus(currentAction!.identifier, 'SUCCEEDED'));

        const skippedAction = actions.find(action => action.identifier === currentAction?.onError);
        if (skippedAction) {
          const actionAndSuccessors = await selectSnapshot(this._store.select(selectPipelineActionAndSuccessors(skippedAction.identifier, 'onSuccess')));
          this._store.dispatch(updateIPipelineActionStatuses(actionAndSuccessors, 'SKIPPED'));
        }

        currentAction = actions.find(action => action.identifier === currentAction?.onSuccess);
      } catch (error) {

        this.consoleOutput.emit({
          message: `${moment().format('HH:mm:ss')}: ${error}`,
          class: 'error'
        });

        if (!currentAction) {
          throw ('action not defined');
        }

        this._store.dispatch(updateIPipelineActionStatus(currentAction.identifier, 'FAILED'));
        if (currentAction.onError) {
          throw (`the action ${currentAction.name} failed, but no error successor was defined!`);
        }

        const skippedAction = actions.find(action => action?.identifier === currentAction?.onSuccess);
        if (skippedAction) {
          const actionAndSuccessors = await selectSnapshot(this._store.select(selectPipelineActionAndSuccessors(skippedAction.identifier, 'onError')));
          this._store.dispatch(updateIPipelineActionStatuses(actionAndSuccessors, 'SKIPPED'));
        }

        currentAction = actions.find(action => action?.identifier === currentAction?.onError);
      }
    }

    if (!solutionWrapper) {
      throw ('no solution found!');
    }

    await this.setOutput(solutionWrapper as ISolutionWrapper);
    this._store.dispatch(highlightSolutionNavItem());
  }

  public async setOutput(solutionWrapper: ISolutionWrapper) {
    this._store.dispatch(setCurrentSolution({ solution: solutionWrapper.solution }));
    this._store.dispatch(addGroups({ groups: (solutionWrapper as ISolutionWrapper).groups }));

    const pipeName = await rxjs.firstValueFrom(this.pipelineName$);
    if (pipeName) {
      this._store.dispatch(setIPipelineSolutionReference(pipeName, solutionWrapper.solution.id));
    }
  }
}
