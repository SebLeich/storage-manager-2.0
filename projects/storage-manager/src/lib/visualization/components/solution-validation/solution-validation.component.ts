import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { SolutionValidationErrorWrapper } from '@/lib/shared/types/solution-validation-error-wrapper.type';
import { Good } from '@/lib/storage-manager/types/good.type';

@Component({
    selector: 'app-solution-validation',
    templateUrl: './solution-validation.component.html',
    styleUrls: ['./solution-validation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionValidationComponent {
    @Output() public goodHovered = new EventEmitter<string>();
    @Output() public goodMouseLeave = new EventEmitter<Good>();
    @Output() public reRender = new EventEmitter<void>();

    public validation = input<SolutionValidationErrorWrapper[]>([]);

    public hoverError(error: SolutionValidationErrorWrapper) {
        error.args && error.args.id && this.goodHovered.emit(error.args.id);
    }

    public mouseleave() {
        this.reRender.emit();
    }

}
