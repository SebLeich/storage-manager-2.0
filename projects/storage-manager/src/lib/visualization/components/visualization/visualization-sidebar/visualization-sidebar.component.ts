import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input } from '@angular/core';
import { Group } from '@/lib/storage-manager/types/group.type';
import { SolutionWrapper } from '@/lib/storage-manager/types/solution-wrapper.type';
import { selectCurrentSolutionValidation } from '@/lib/visualization/store/visualization.selectors';
import { Store } from '@ngrx/store';
import bottomUpFadeInAnimation from '@/lib/shared/animations/bottom-up-fade.animation';

@Component({
    selector: 'app-visualization-sidebar',
    templateUrl: './visualization-sidebar.component.html',
    styleUrl: './visualization-sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [bottomUpFadeInAnimation]
})
export class VisualizationSidebarComponent {
    @Output() public goodHovered = new EventEmitter<string>();
    @Output() public groupColorChanged = new EventEmitter<Group>();
    @Output() public groupVisibilityChanged = new EventEmitter<Group>();
    @Output() public startAnimation = new EventEmitter<void>();
    @Output() public stopAnimation = new EventEmitter<void>();
    @Output() public pauseAnimation = new EventEmitter<void>();
    @Output() public nextStep = new EventEmitter<void>();
    @Output() public previousStep = new EventEmitter<void>();
    @Output() public fastForward = new EventEmitter<void>();
    @Output() public fastRewind = new EventEmitter<void>();
    @Output() public intervalSpeedChange = new EventEmitter<number>();

    public solutionWrapper = input<SolutionWrapper | null>(null);
    public currentStepIndex = input<number | null>(null);
    public intervalSpeed = input<number>(0);
    public playStatus = input<'playing' | 'paused' | 'stopped'>('stopped');
    public hoveredGood = input<string | null>(null);

    public groups = computed(() => this.solutionWrapper()?.groups ?? []);
    public goods = computed(() => this.solutionWrapper()?.solution?.container.goods ?? []);
    public calculationSteps = computed(() => this.solutionWrapper()?.calculationSteps ?? []);
    public calculationSourceTitle = computed(() => this.solutionWrapper()?.solution.calculationSource.title ?? null);
    public calculationDate = computed(() => this.solutionWrapper()?.solution.calculated ?? '');
    public container = computed(() => this.solutionWrapper()?.solution.container ?? null);

    public currentSolutionValidation$ = this._store.select(selectCurrentSolutionValidation);

    constructor(private _store: Store) { }
}
