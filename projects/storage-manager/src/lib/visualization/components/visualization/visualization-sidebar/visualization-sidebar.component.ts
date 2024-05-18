import { Group } from '@/lib/storage-manager/types/group.type';
import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input } from '@angular/core';

@Component({
    selector: 'app-visualization-sidebar',
    templateUrl: './visualization-sidebar.component.html',
    styleUrl: './visualization-sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationSidebarComponent {
    @Output() public goodHovered = new EventEmitter<string>();
    @Output() public groupColorChanged = new EventEmitter<Group>();

    public solutionWrapper = input<SolutionWrapper | null>(null);
    public groups = computed(() => this.solutionWrapper()?.groups ?? []);
    public calculationSourceTitle = computed(() => this.solutionWrapper()?.solution.calculationSource.title ?? null);
    public calculationDate = computed(() => this.solutionWrapper()?.solution.calculated ?? '');
    public container = computed(() => this.solutionWrapper()?.solution.container ?? null);
}
