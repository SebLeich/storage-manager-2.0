import { Inject, Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Observable } from 'rxjs';
import { ParamCodes } from 'src/config/param-codes';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { ParamEditorComponent } from '../components/dialog/param-editor/param-editor.component';
import { ITaskCreationComponentInput } from '../interfaces/task-creation-component-input.interface';
import { TaskCreationComponent } from '../components/dialog/task-creation/task-creation.component';
import { FUNCTIONS_CONFIG_TOKEN, IFunction } from '../interfaces/function.interface';
import { IBpmnJS } from '../interfaces/bpmn-js.interface';
import { ITaskCreationDataWrapper } from '../interfaces/task-creation-data-wrapper.interface';
import { ITaskCreationData } from '../interfaces/task-creation-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private _dialog: MatDialog,
    @Inject(FUNCTIONS_CONFIG_TOKEN) public funcs: IFunction[],
    private _injector: Injector
  ) { }

  public configTaskCreation(data: ITaskCreationDataWrapper, bpmnJS?: IBpmnJS): Observable<ITaskCreationData> {
    const ref = this._dialog.open(TaskCreationComponent, {
      injector: this._injector,
      panelClass: 'no-padding-dialog',
      data: {
        data: data,
        bpmnJS: bpmnJS
      } as ITaskCreationComponentInput,
      disableClose: true
    });
    document.getElementsByClassName('cdk-overlay-container')[0]?.classList.add('z-index-1002');
    return ref.afterClosed().pipe(
      finalize(() => {
        document.getElementsByClassName('cdk-overlay-container')[0]?.classList.remove('z-index-1002');
      })
    );
  }

  public editParam(paramCode: ParamCodes, element: IElement): Observable<Object> {
    let ref = this._dialog.open(ParamEditorComponent, {
      data: { paramCode: paramCode, element: element },
      panelClass: 'no-padding-dialog',
      disableClose: true
    });
    return ref.afterClosed();
  }

}
