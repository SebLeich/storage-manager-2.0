import { Inject, Injectable, Injector } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize, Observable } from 'rxjs';
import { ParamCodes } from 'src/config/param-codes';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { ParamEditorComponent } from '../components/dialog/param-editor/param-editor.component';
import { TaskCreationComponent } from '../components/dialog/task-creation/task-creation.component';
import { FUNCTIONS_CONFIG_TOKEN, IFunction } from '../interfaces/function.interface';
import { ITaskCreationDataWrapper } from '../interfaces/task-creation-data-wrapper.interface';
import { ITaskCreationFormGroupValue } from '../interfaces/task-creation-form-group-value.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private _dialog: MatDialog,
    @Inject(FUNCTIONS_CONFIG_TOKEN) public funcs: IFunction[],
    private _injector: Injector
  ) { }

  public configTaskCreation(data: ITaskCreationDataWrapper): Observable<ITaskCreationFormGroupValue> {
    const ref = this._dialog.open(TaskCreationComponent, {
      injector: this._injector,
      panelClass: 'no-padding-dialog',
      data: data,
      disableClose: true,
      maxWidth: 'unset'
    });

    document.getElementsByClassName('cdk-overlay-container')[0]?.classList.add('z-index-1002');

    return ref.afterClosed().pipe(
      finalize(() => {
        document.getElementsByClassName('cdk-overlay-container')[0]?.classList.remove('z-index-1002');
      })
    );
  }

  public editParam(paramCode: ParamCodes, element: IElement): Observable<object> {
    const ref = this._dialog.open(ParamEditorComponent, {
      data: { paramCode: paramCode, element: element },
      panelClass: 'no-padding-dialog',
      disableClose: true
    });
    return ref.afterClosed();
  }

}
