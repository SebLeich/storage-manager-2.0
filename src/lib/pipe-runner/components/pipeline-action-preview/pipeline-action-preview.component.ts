import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPipelineAction } from 'src/lib/pipeline-store/interfaces/pipeline-action.interface';
import { ReplaySubject, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPipelineActionStatus } from '../../../pipeline-store/store/selectors/pipeline-action-status.selectors';
import { map } from 'rxjs/internal/operators/map';
import { selectPipelineByName } from 'src/lib/pipeline-store/store/selectors/pipeline.selectors';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { ISolutionWrapper } from '@smgr/interfaces';

@Component({
  selector: 'app-pipeline-action-preview',
  templateUrl: './pipeline-action-preview.component.html',
  styleUrls: ['./pipeline-action-preview.component.scss']
})
export class PipelineActionPreviewComponent {

  private _action$$ = new ReplaySubject<IPipelineAction | null>(1);
  @Input() public set pipelineAction(action: IPipelineAction) {
    this._action$$.next(action);
  }
  @Output() public setOutput = new EventEmitter<ISolutionWrapper>();
  public pipelineAction$ = this._action$$.asObservable();
  public pipeline$ = this.pipelineAction$.pipe(switchMap(action => this._store.select(selectPipelineByName(action!.pipeline))));
  public actionStatus$ = this.pipelineAction$.pipe(switchMap((action => this._store.select(selectPipelineActionStatus(action!.identifier)))))
  public isProvidingOutput$ = this.pipelineAction$.pipe(map(action => action?.isProvidingPipelineOutput ? true : false));
  public actionOutput$ = this.pipelineAction$.pipe(map(action => action?.solutionReference?.solution?.id));
  public isSelectedOutput$ = combineLatest([this.pipelineAction$, this.pipeline$]).pipe(map(([action, pipeline]) => action?.solutionReference?.solution?.id === pipeline?.solutionReference));
  public providesOutput$ = this.pipelineAction$.pipe(map(action => action?.solutionReference != null));
  public solutionDescription$ = this.pipelineAction$.pipe(map(action => action?.solutionReference?.solution?.description));

  constructor(private _store: Store) { }

  public async trySetOutput() {
    const providesOutput = await selectSnapshot(this.providesOutput$);
    if(providesOutput){
      const action = await selectSnapshot(this.pipelineAction$);
      if(action?.solutionReference){
        this.setOutput.next(action.solutionReference);
      }
    }
  }

}
