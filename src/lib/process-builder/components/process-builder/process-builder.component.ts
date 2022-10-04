import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { showAnimation } from 'src/lib/shared/animations/show-delayed.animation';
import { BpmnJsService } from '../../services/bpmnjs.service';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { ProcessBuilderComponentService } from './process-builder-component.service';
import { delay, map, Observable, startWith, switchMap, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCurrentIBpmnJSModel } from '../../store/selectors/i-bpmn-js-model.selectors';

@Component({
  selector: 'app-process-builder',
  templateUrl: './process-builder.component.html',
  styleUrls: ['./process-builder.component.sass'],
  providers: [ProcessBuilderComponentService],
  animations: [showAnimation]
})
export class ProcessBuilderComponent implements OnDestroy, OnInit {

  @ViewChild('diagramWrapper', { static: true }) private diagramWrapper!: ElementRef<HTMLDivElement>;

  public animationStatus$ = this._store.select(selectCurrentIBpmnJSModel).pipe(
    switchMap(() => timer(0).pipe(
      map(() => 'visible'),
      startWith('hidden')
    ))
  );

  constructor(
    public processBuilderService: ProcessBuilderService,
    public processBuilderComponentService: ProcessBuilderComponentService,
    public bpmnJsService: BpmnJsService,
    private _store: Store,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.init();
  }

  public ngOnDestroy(): void {
    this.processBuilderComponentService.dispose();
  }

  private async init() {
    await this.processBuilderComponentService.init(this.diagramWrapper.nativeElement);
    this._changeDetectorRef.detectChanges();
  }

}
