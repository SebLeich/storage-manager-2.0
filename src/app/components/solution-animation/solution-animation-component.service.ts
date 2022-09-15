import { Injectable, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subscription, timer } from "rxjs";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { VisualizerComponentService } from "../main/visualizer/visualizer-component-service";
import { selectCurrentSolutionSteps } from "src/app/store/selectors/i-solution.selectors";
import { IStep } from "src/app/interfaces/i-step.interface";
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";

@Injectable()
export class SolutionAnimationComponentService implements OnDestroy, OnInit {

    private _animationRunning = new BehaviorSubject<boolean>(false);
    private _stepIndex = new BehaviorSubject<number>(0);
    private _animationSpeed = new BehaviorSubject<number>(2);

    animationRunning$ = this._animationRunning.asObservable();
    animationSpeed$ = this._animationSpeed.asObservable();
    stepIndex$ = this._stepIndex.asObservable();

    currentStep$ = combineLatest([this._store.select(selectCurrentSolutionSteps), this.stepIndex$]).pipe(map(([steps, index]: [IStep[] | null, number]) => {
        if (!Array.isArray(steps)) {
            return;
        }
        return steps[index];
    }));

    private _subscriptions = new Subscription();

    constructor(
        private _visualizerComponentService: VisualizerComponentService,
        private _store: Store,
    ) { }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    public ngOnInit(): void {
        this._subscriptions.add(
            combineLatest([this.animationRunning$, this.stepIndex$, this._store.select(selectCurrentSolutionSteps)])
                .pipe(
                    filter(([animationRunning, _]) => animationRunning)
                )
                .subscribe(([_, index, steps]) => {
                    const step = steps![index];
                    this._visualizerComponentService.animateStep(step, false, true)
                })
        );
    }

    setAnimationSpeed(value: number) {
        if (value > 0 && value < 60) this._animationSpeed.next(value);
    }

    async startAnimation() {
        const currentSteps = await selectSnapshot(this._store.select(selectCurrentSolutionSteps));
        if (!currentSteps || currentSteps.length === 0) {
            return;
        }

        this._visualizerComponentService.clearScene();
        this._animationRunning.next(true);

        this._subscriptions.add(
            timer(0, this._animationSpeed.value * 1000).pipe(
                takeUntil(this._animationRunning.pipe(filter(x => x === false))),
                tap((index: number) => {
                    if (typeof currentSteps[index] === 'undefined') {
                        this._animationRunning.next(false);
                    }
                })
            ).subscribe((index) => {
                this._stepIndex.next(index);
            })
        );
    }

    stopAnimation() {
        this._animationRunning.next(false);
    }

}