import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { showAnimation } from 'src/lib/shared/animations/show';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { ProcessBuilderComponentService } from './process-builder-component.service';

@Component({
  selector: 'app-process-builder',
  templateUrl: './process-builder.component.html',
  styleUrls: ['./process-builder.component.sass'],
  providers: [ProcessBuilderComponentService],
  animations: [showAnimation]
})
export class ProcessBuilderComponent implements OnDestroy, OnInit {

  @ViewChild('diagramWrapper', { static: true }) private diagramWrapper!: ElementRef<HTMLDivElement>;

  constructor(
    public processBuilderService: ProcessBuilderService,
    public processBuilderComponentService: ProcessBuilderComponentService,
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
