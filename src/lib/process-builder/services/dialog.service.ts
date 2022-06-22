import { Inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ParamCodes } from 'src/config/param-codes';
import { IElement } from 'src/lib/bpmn-io/i-element';
import { ParamEditorComponent } from '../components/dialog/param-editor/param-editor.component';
import { ITaskCreationComponentInput, ITaskCreationData, ITaskCreationDataWrapper, ITaskCreationPayload } from '../components/dialog/task-creation/i-task-creation-component-input';
import { TaskCreationComponent } from '../components/dialog/task-creation/task-creation.component';
import { FUNCTIONS_CONFIG_TOKEN, IFunction } from '../globals/i-function';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private _dialog: MatDialog,
    @Inject(FUNCTIONS_CONFIG_TOKEN) public funcs: IFunction[]
  ) { }

  configTaskCreation(data: ITaskCreationDataWrapper, bpmnJS: any): Observable<ITaskCreationData> {
    let ref = this._dialog.open(TaskCreationComponent, {
      panelClass: 'no-padding-dialog',
      data: {
        'data': data,
        'bpmnJS': bpmnJS
      } as ITaskCreationComponentInput,
      disableClose: true
    });
    return ref.afterClosed();
  }

  editParam(paramCode: ParamCodes, element: IElement): Observable<Object> {
    let ref = this._dialog.open(ParamEditorComponent, {
      data: { paramCode: paramCode, element: element },
      panelClass: 'no-padding-dialog',
      disableClose: true
    });
    return ref.afterClosed();
  }

}
