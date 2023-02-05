import { Component, Input } from '@angular/core';
import { IPipelineAction } from 'src/lib/pipeline-store/interfaces/pipeline-action.interface';
import { ReplaySubject, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectPipelineActionStatus } from '../../../pipeline-store/store/selectors/pipeline-action-status.selectors';

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
  public pipelineAction$ = this._action$$.asObservable();
  public actionStatus$ = this.pipelineAction$.pipe(switchMap((action => this._store.select(selectPipelineActionStatus(action!.identifier)))))

  constructor(private _store: Store) { }

}
