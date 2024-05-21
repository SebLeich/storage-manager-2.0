import { CalculationStep } from '@/lib/storage-manager/types/calculation-step.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input } from '@angular/core';

@Component({
    selector: 'app-calculation-steps',
    templateUrl: './calculation-steps.component.html',
    styleUrl: './calculation-steps.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculationStepsComponent {
    @Output() public previousStep = new EventEmitter<void>();
    @Output() public nextStep = new EventEmitter<void>();
    @Output() public startAnimation = new EventEmitter<void>();
    @Output() public pauseAnimation = new EventEmitter<void>();
    @Output() public stopAnimation = new EventEmitter<void>();
    @Output() public fastForward = new EventEmitter<void>();
    @Output() public fastRewind = new EventEmitter<void>();
    @Output() public intervalSpeedChange = new EventEmitter<number>();

    public calculationSteps = input<CalculationStep[]>([]);
    public currentStepIndex = input<number | null>(null);
    public intervalSpeed = input<number>(0);
    public playStatus = input<'playing' | 'paused' | 'stopped'>('stopped');

    public currentStep = computed(() => {
        const currentStepIndex = this.currentStepIndex();
        if (currentStepIndex == null) {
            return null;
        }

        return this.calculationSteps()[currentStepIndex];
    });

    public messages = computed(() => {
        const currentStep = this.currentStep();
        return currentStep?.messages ?? [];
    });

    public togglePlayStatus(): void {
        const startPlaying = this.playStatus() !== 'playing';
        this[startPlaying ? 'startAnimation' : 'pauseAnimation'].emit();
    }
}
