import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPipelineByName } from '../../store/selectors/pipeline.selectors';
import { map } from 'rxjs';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pipe-runner',
  templateUrl: './pipe-runner.component.html',
  styleUrls: ['./pipe-runner.component.scss']
})
export class PipeRunnerComponent {

  public pipeline$ = this._store.select(selectPipelineByName('myPipe'));
  public actions$ = this.pipeline$.pipe(map(pipeline => pipeline?.actions));

  constructor(private _store: Store, private _snackBar: MatSnackBar){
    this._snackBar.open('under construction ;)', 'Ok', {
      duration: 3000
    });
  }

  public async run(){
    const actions = await selectSnapshot(this.actions$);
    let index = 0;
    let currentAction = actions![index];
    while(currentAction){
      const compiledCode = eval(currentAction.executableCode);
      const result = await compiledCode();
      console.log(result);
      index++;
      currentAction = actions![index];
    }
  }

}
