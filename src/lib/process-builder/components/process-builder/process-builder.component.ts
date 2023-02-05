import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { showAnimation } from 'src/lib/shared/animations/show-delayed.animation';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { map, Subscription, startWith, switchMap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel } from '../../store/selectors/bpmn-js-model.selectors';
import { ProcessBuilderComponentService } from './process-builder-component.service';
import shapeTypes from 'src/lib/bpmn-io/shape-types';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { upsertProcedure } from 'src/lib/storage-manager-store/store/actions/pending-procedure.actions';

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

    this._subscription.add(
      this._processBuilderComponentService
        .taskEditingDialogResultReceived$
        .subscribe((args) => {
          this._processBuilderComponentService.applyTaskCreationConfig(args.taskCreationPayload, args.taskCreationData);
        })
    );

    this._subscription.add(
      this._processBuilderComponentService
        .paramEditorDialogResultReceived$
        .subscribe((args) => {
          console.log(args);
        })
    );

    this._subscription.add(
      this.bpmnJsService.taskEditingProcedure$
        .subscribe(procedure => {
          this._store.dispatch(upsertProcedure({ procedure }));
        })
    );

    this._subscription.add(
      BpmnJsService.elementDeletionRequested$.subscribe(async element => {
        switch (element.type) {
          case shapeTypes.Task:
            await this._processBuilderComponentService.tryDeleteFunction(element);
            break;

          case shapeTypes.ExclusiveGateway:
            const isErrorGateway = BPMNJsRepository.sLPBExtensionSetted(element.businessObject, 'GatewayExtension', (ext) => ext.gatewayType === 'error_gateway');
            if (isErrorGateway) {
              await this._processBuilderComponentService.tryDeleteErrorGateway(element);
            } else {
              this.bpmnJsService.modelingModule.removeElements([element]);
            }
            break;

          default:
            this.bpmnJsService.modelingModule.removeElements([element]);
            break;
        }
      })
    );

    this.bpmnJsService.toolManagerUpdateEventFired$.subscribe(evt => console.log(evt));

  }

}
