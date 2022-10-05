import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { showAnimation } from 'src/lib/shared/animations/show-delayed.animation';
import { BpmnJsService } from '../../services/bpmnjs.service';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { map, startWith, switchMap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel } from '../../store/selectors/i-bpmn-js-model.selectors';

@Component({
  selector: 'app-process-builder',
  templateUrl: './process-builder.component.html',
  styleUrls: ['./process-builder.component.sass'],
  animations: [showAnimation]
})
export class ProcessBuilderComponent implements OnInit {

  @ViewChild('diagramWrapper', { static: true }) private diagramWrapper!: ElementRef<HTMLDivElement>;

  public animationStatus$ = this._store.select(selectCurrentIBpmnJSModel).pipe(
    switchMap(() => timer(0).pipe(
      map(() => 'visible'),
      startWith('hidden')
    ))
  );

  constructor(public processBuilderService: ProcessBuilderService, public bpmnJsService: BpmnJsService, private _store: Store) { }

  public ngOnInit(): void {
    this.init();
  }

  private async init() {
    await this.bpmnJsService.attachBpmnModelToDomElement(this.diagramWrapper.nativeElement);
  }

}
