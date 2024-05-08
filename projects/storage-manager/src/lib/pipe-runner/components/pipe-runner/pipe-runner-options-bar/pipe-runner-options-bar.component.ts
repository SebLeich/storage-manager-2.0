import { IPipelineAction } from '@/lib/pipeline-store/interfaces/pipeline-action.interface';
import IPipeline from '@/lib/pipeline-store/interfaces/pipeline.interface';
import { ISolution } from '@/lib/storage-manager/interfaces';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pipe-runner-options-bar',
  templateUrl: './pipe-runner-options-bar.component.html',
  styleUrls: ['./pipe-runner-options-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipeRunnerOptionsBarComponent {
  @Input() public selectedPipeline: IPipeline | undefined = undefined;
  @Input() public actions: IPipelineAction[] | undefined = undefined;
  @Input() public solution: ISolution | undefined = undefined;
  @Input() public isMinimized = false;

  @Output() public designPipeline = new EventEmitter<void>();
  @Output() public runPipeline = new EventEmitter<void>();
  @Output() public openVisualization = new EventEmitter<void>();
  @Output() public viewModeToggle = new EventEmitter<void>();
}
