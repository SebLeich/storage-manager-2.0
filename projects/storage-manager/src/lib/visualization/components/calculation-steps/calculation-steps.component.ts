import { CalculationStep } from '@/lib/storage-manager/types/calculation-step.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input } from '@angular/core';

@Component({
    selector: 'app-calculation-steps',
    templateUrl: './calculation-steps.component.html',
    styleUrl: './calculation-steps.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculationStepsComponent {
    @Output() public nextStep = new EventEmitter<void>();
    @Output() public startPlaying = new EventEmitter<void>();
    @Output() public pausePlaying = new EventEmitter<void>();
    @Output() public stopPlaying = new EventEmitter<void>();

    public calculationSteps = input<CalculationStep[]>([]);
    public currentStepIndex = input<number>(0);
    public playStatus = input<'playing' | 'paused' | 'stopped'>('stopped');

    public currentStep = computed(() => this.calculationSteps()[this.currentStepIndex()]);
    public messages = computed(() => this.currentStep().messages);

    public togglePlayStatus(): void {
        const startPlaying = this.playStatus() !== 'playing';
        this[startPlaying ? 'startPlaying' : 'pausePlaying'].emit();
    }
}
