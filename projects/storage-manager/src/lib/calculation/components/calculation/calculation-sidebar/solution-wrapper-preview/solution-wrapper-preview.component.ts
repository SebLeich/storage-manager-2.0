import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'app-solution-wrapper-preview',
    templateUrl: './solution-wrapper-preview.component.html',
    styleUrl: './solution-wrapper-preview.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionWrapperPreviewComponent {
    @Output() public showSolution = new EventEmitter<void>();

    public solutionWrapper = input<SolutionWrapper>();
}
