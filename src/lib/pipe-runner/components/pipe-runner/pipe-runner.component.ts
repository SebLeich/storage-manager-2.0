import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, map } from 'rxjs';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { ActivatedRoute } from '@angular/router';
import { selectPipelineByName } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import { selectPipelineActionByPipelineName } from 'src/lib/pipeline-store/store/selectors/pipeline-action.selectors';
import { updateIPipelineActionStatus } from 'src/lib/pipeline-store/store/actions/pipeline-action-status.action';

@Component({
  selector: 'app-pipe-runner',
  templateUrl: './pipe-runner.component.html',
  styleUrls: ['./pipe-runner.component.scss']
})
export class PipeRunnerComponent {

  public pipeline$ = this._route.queryParams.pipe(switchMap(queryParams => this._store.select(selectPipelineByName(queryParams.pipeline ?? 'myPipe'))));
  public actions$ = this.pipeline$.pipe(
    switchMap(pipeline => this._store.select(selectPipelineActionByPipelineName(pipeline!.name))),
    map(actions => actions.sort((a, b) => a!.sequenceNumber > b!.sequenceNumber? 1: -1))
  );

  constructor(private _store: Store, private _route: ActivatedRoute) { }

  public async run() {
    const actions = await selectSnapshot(this.actions$);
    let index = 0;
    let currentAction = actions![index];
    while (currentAction) {
      this._store.dispatch(updateIPipelineActionStatus(currentAction.identifier, 'RUNNING'));
      const result = await currentAction.executableCode();
      console.log(result);
      index++;
      this._store.dispatch(updateIPipelineActionStatus(currentAction.identifier, 'SUCCEEDED'));
      currentAction = actions![index];
    }
  }

}
