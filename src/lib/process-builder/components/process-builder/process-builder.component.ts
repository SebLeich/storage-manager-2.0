import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { showAnimation } from 'src/lib/shared/animations/show-delayed.animation';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { map, Subscription, startWith, switchMap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel } from '../../store/selectors/i-bpmn-js-model.selectors';
import { DialogService } from '../../services/dialog.service';
import { ProcessBuilderComponentService } from './process-builder-component.service';
import { upsertProcedure } from 'src/app/store/actions/i-pending-procedure.actions';
import { ITaskCreationData } from '../../interfaces/i-task-creation-data.interface';
import { ITaskCreationPayload } from '../../interfaces/i-task-creation-payload.interface';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';

@Component({
  selector: 'app-process-builder',
  templateUrl: './process-builder.component.html',
  styleUrls: ['./process-builder.component.sass'],
  animations: [showAnimation],
  providers: [ProcessBuilderComponentService]
})
export class ProcessBuilderComponent implements OnDestroy, OnInit {

  @ViewChild('diagramWrapper', { static: true }) private diagramWrapper!: ElementRef<HTMLDivElement>;

  public animationStatus$ = this._store.select(selectCurrentIBpmnJSModel).pipe(
    switchMap(() => timer(0).pipe(
      map(() => 'visible'),
      startWith('hidden')
    ))
  );

  private _subscription = new Subscription();

  constructor(
    public processBuilderService: ProcessBuilderService,
    public bpmnJsService: BpmnJsService,
    private _store: Store,
    private _dialogService: DialogService,
    private _processBuilderComponentService: ProcessBuilderComponentService,
  ) { }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public ngOnInit(): void {
    this.init();
  }

  private async init() {
    await this.bpmnJsService.attachBpmnModelToDomElement(this.diagramWrapper.nativeElement);

    this._processBuilderComponentService
      .taskEditingDialogResultReceived$
      .subscribe((args) => {
        this._processBuilderComponentService.applyTaskCreationConfig(args.taskCreationData, args.taskCreationPayload);
      });

    this.bpmnJsService.taskEditingProcedure$
      .subscribe(procedure => {
        this._store.dispatch(upsertProcedure({ procedure }));
      });
  }

}
