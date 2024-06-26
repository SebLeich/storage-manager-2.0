import { Component, DestroyRef, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { showAnimation } from 'src/lib/shared/animations/show-delayed.animation';
import { BpmnJsService } from '../../services/bpmn-js.service';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { map, startWith, switchMap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel } from '../../store/selectors/bpmn-js-model.selectors';
import { ProcessBuilderComponentService } from './process-builder-component.service';
import { BPMNJsRepository } from 'src/lib/core/bpmn-js.repository';
import { upsertProcedure } from '@procedure';
import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { IBpmnJS } from '../../interfaces/bpmn-js.interface';
import { BPMN_JS } from '@process-builder/injection';
import { C2M_INJECTION_TOKEN } from './constants/c2m-processor.constant';
import { ActivityC2MProcessor } from './c2m-processors/activity.c2m-processor';
import { IC2MProcessor } from './interfaces/c2m-processor.interface';
import { ConnectorC2MProcessor } from './c2m-processors/connector.c2m-processor';
import { EventC2MProcessor } from './c2m-processors/event.c2m-processor';
import { GatewayC2MProcessor } from './c2m-processors/gateway.c2m-processor';
import { isPromise } from '@/lib/shared/globals/is-promise.constant';
import { C2S_INJECTION_TOKEN } from './constants/c2s-processing.constant';
import { IC2SProcessor } from './interfaces/c2s-processor.interface';
import { ActivityC2SProcessor } from './c2s-processors/activity.c2s-processor';
import { OutputC2SProcessor } from './c2s-processors/output.c2s-processor';
import { OutputC2MProcessor } from './c2m-processors/output.c2m-processor';
import { ITaskCreationOutput } from '../dialog/task-creation/interfaces/task-creation-output.interface';
import { IC2SOutput } from '../dialog/task-creation/interfaces/c2S-output.interface';
import { InputC2MProcessor } from './c2m-processors/input.c2m-processor';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import shapeTypes from 'src/lib/bpmn-io/shape-types';

@Component({
    selector: 'app-process-builder',
    templateUrl: './process-builder.component.html',
    styleUrls: ['./process-builder.component.scss'],
    animations: [showAnimation],
    providers: [
        ProcessBuilderComponentService,
        { provide: C2S_INJECTION_TOKEN, useClass: ActivityC2SProcessor, multi: true },
        { provide: C2S_INJECTION_TOKEN, useClass: OutputC2SProcessor, multi: true },
        { provide: C2M_INJECTION_TOKEN, useClass: ActivityC2MProcessor, multi: true },
        { provide: C2M_INJECTION_TOKEN, useClass: ConnectorC2MProcessor, multi: true },
        { provide: C2M_INJECTION_TOKEN, useClass: OutputC2MProcessor, multi: true },
        { provide: C2M_INJECTION_TOKEN, useClass: InputC2MProcessor, multi: true },
        { provide: C2M_INJECTION_TOKEN, useClass: EventC2MProcessor, multi: true },
        { provide: C2M_INJECTION_TOKEN, useClass: GatewayC2MProcessor, multi: true },
    ]
})
export class ProcessBuilderComponent implements OnInit {

    @ViewChild('diagramWrapper', { static: true }) private diagramWrapper!: ElementRef<HTMLDivElement>;

    public animationStatus$ = this._store.select(selectCurrentIBpmnJSModel).pipe(
        switchMap(() => timer(0).pipe(
            map(() => 'visible'),
            startWith('hidden')
        ))
    );

    constructor(
        @Inject(C2S_INJECTION_TOKEN) private _c2sProcessors: IC2SProcessor[],
        @Inject(C2M_INJECTION_TOKEN) private _c2mProcessors: IC2MProcessor[],
        @Inject(BPMN_JS) private _bpmnJs: IBpmnJS,
        public processBuilderService: ProcessBuilderService,
        public bpmnJsService: BpmnJsService,
        private _destroyRef: DestroyRef,
        private _store: Store,
        private _processBuilderComponentService: ProcessBuilderComponentService,
    ) { }

    public ngOnInit(): void {
        this.init();
    }

    private async init() {
        await this.bpmnJsService.attachBpmnModelToDomElement(this.diagramWrapper.nativeElement);

        this._processBuilderComponentService
            .taskEditingDialogResultReceived$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(async (args) => await this._processConfiguration(args));

        this.bpmnJsService.taskEditingProcedure$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((procedure) => this._store.dispatch(upsertProcedure({ procedure })));

        BpmnJsService.elementDeletionRequested$
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(async element => {
                switch (element.type) {
                    case shapeTypes.Task:
                        await this._processBuilderComponentService.tryDeleteFunction(element);
                        break;

                    case shapeTypes.ExclusiveGateway:
                        await this._processBuilderComponentService.tryDeleteErrorGateway(element);
                        break;

                    case shapeTypes.EndEvent:
                        // eslint-disable-next-line no-case-declarations
                        const firstOuputProvidingActivity = this._getFirstProvidedOutputWithSLPBExtension(element, 'isProcessOutput');
                        if (firstOuputProvidingActivity) {
                            BPMNJsRepository.updateBpmnElementSLPBExtension(this._bpmnJs, firstOuputProvidingActivity.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput = false);
                        }
                        this.bpmnJsService.modelingModule.removeElements([element]);
                        this.bpmnJsService.saveCurrentBpmnModel();
                        break;

                    default:
                        this.bpmnJsService.modelingModule.removeElements([element]);
                        break;
                }
            });

        BpmnJsService.elementEndEventCreationRequested
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(async element => {
                const firstOutputMatchingActivity = this._getFirstProvidedOutputWithSLPBExtension(element, 'matchesProcessOutputInterface');
                if (firstOutputMatchingActivity) {
                    BPMNJsRepository.updateBpmnElementSLPBExtension(this._bpmnJs, firstOutputMatchingActivity.businessObject, 'DataObjectExtension', (ext) => ext.isProcessOutput = true);
                }
                this.bpmnJsService.modelingModule.appendShape(element, { type: shapeTypes.EndEvent });
                this.bpmnJsService.saveCurrentBpmnModel();
            });
    }

    private async _processConfiguration(args: ITaskCreationOutput) {
        const c2SOutputs: IC2SOutput = {} as IC2SOutput;
        await this._processC2S(args, c2SOutputs);
        await this._processC2M(args, c2SOutputs);
        await this.bpmnJsService.saveCurrentBpmnModel(true);
    }

    private async _processC2S(args: ITaskCreationOutput, c2SOutputs: IC2SOutput) {
        for (const step of this._c2sProcessors) {
            const processOutputCandidate = step.processConfiguration(args, c2SOutputs);

            const result = isPromise(processOutputCandidate) ? await processOutputCandidate : processOutputCandidate;

            if (result) {
                c2SOutputs = { ...c2SOutputs, ...result };
            }
        }
    }

    private async _processC2M(args: ITaskCreationOutput, c2SOutputs: IC2SOutput) {
        for (const step of this._c2mProcessors) {
            const processOutputCandidate = step.processConfiguration(args, c2SOutputs);

            isPromise(processOutputCandidate) ? await processOutputCandidate : processOutputCandidate;
        }
    }

    private _getFirstProvidedOutputWithSLPBExtension(currentElement: IElement, extension: 'matchesProcessOutputInterface' | 'isProcessOutput') {
        let sourceElement: IElement | undefined = currentElement;
        while (sourceElement) {
            const dataOutputRef = sourceElement.outgoing.find(outgoing => outgoing.type === shapeTypes.DataOutputAssociation)?.target;
            if (dataOutputRef) {
                const matchesProcessOutputInterface = BPMNJsRepository.getSLPBExtension(dataOutputRef.businessObject, 'DataObjectExtension', (ext) => ext[extension]);
                if (matchesProcessOutputInterface) {
                    return dataOutputRef;
                }
            }

            sourceElement = sourceElement.incoming.find(incoming => incoming.type === shapeTypes.SequenceFlow && incoming.source?.type === shapeTypes.Task)?.source;
        }

        return undefined;
    }
}
