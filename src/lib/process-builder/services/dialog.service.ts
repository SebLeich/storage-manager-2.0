import { Inject, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ParamCodes } from 'src/config/param-codes';
import { IElement } from 'src/lib/bpmn-io/interfaces/i-element.interface';
import { ParamEditorComponent } from '../components/dialog/param-editor/param-editor.component';
import { ITaskCreationComponentInput, ITaskCreationData, ITaskCreationDataWrapper } from '../interfaces/i-task-creation-component-inpu.interfacet';
import { TaskCreationComponent } from '../components/dialog/task-creation/task-creation.component';
import { IBpmnJSModel } from '../interfaces/i-bpmn-js-model.interface';
import { FUNCTIONS_CONFIG_TOKEN, IFunction } from '../globals/i-function';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private _dialog: MatDialog,
    @Inject(FUNCTIONS_CONFIG_TOKEN) public funcs: IFunction[],
    private _injector: Injector
  ) { }

  public configTaskCreation(data: ITaskCreationDataWrapper, bpmnJS: IBpmnJSModel): Observable<ITaskCreationData> {
    const ref = this._dialog.open(TaskCreationComponent, {
      injector: this._injector,
      panelClass: 'no-padding-dialog',
      data: {
        'data': data,
        'bpmnJS': bpmnJS
      } as ITaskCreationComponentInput,
      disableClose: true
    });
    return ref.afterClosed();
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
