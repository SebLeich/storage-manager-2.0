import { Inject, Injectable, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, Subscription, timer } from "rxjs";
import { filter, map, takeUntil, tap } from "rxjs/operators";
import { IStep } from "@smgr/interfaces";
import { selectSnapshot } from "src/lib/process-builder/globals/select-snapshot";
import { IVisualizerContextService, VISUALIZER_CONTEXT } from "src/app/interfaces/i-visualizer-context.service";
import { selectCurrentSolutionSteps } from "@smgr/store";

@Injectable()
export class SolutionAnimationComponentService implements OnDestroy, OnInit {

    private _animationRunning$$ = new BehaviorSubject<boolean>(false);
    private _stepIndex$$ = new BehaviorSubject<number>(0);
    private _animationSpeed$$ = new BehaviorSubject<number>(2);

    public animationRunning$ = this._animationRunning$$.asObservable();
    public animationSpeed$ = this._animationSpeed$$.asObservable();
    public stepIndex$ = this._stepIndex$$.asObservable();

    public currentStep$ = combineLatest([this._store.select(selectCurrentSolutionSteps), this.stepIndex$]).pipe(map(([steps, index]: [IStep[] | null, number]) => {
        if (!Array.isArray(steps)) {
            return;
        }
        return steps[index];
    }));

    private _subscriptions = new Subscription();

    constructor(private _store: Store) { }

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
                    //this._visualizerComponentService.animateStep(step, false, true)
                })
        );
    }

    public setAnimationSpeed(value: number) {
        if (value > 0 && value < 60) this._animationSpeed$$.next(value);
    }

    public async startAnimation() {
        const currentSteps = await selectSnapshot(this._store.select(selectCurrentSolutionSteps));
        if (!currentSteps || currentSteps.length === 0) {
            return;
        }

        //this._visualizerComponentService.clearScene();
        this._animationRunning$$.next(true);

        this._subscriptions.add(
            timer(0, this._animationSpeed$$.value * 1000).pipe(
                takeUntil(this._animationRunning$$.pipe(filter(x => x === false))),
                tap((index: number) => {
                    if (typeof currentSteps[index] === 'undefined') {
                        this._animationRunning$$.next(false);
                    }
                })
            ).subscribe((index) => {
                this._stepIndex$$.next(index);
            })
        );
    }

    public stopAnimation() {
        this._animationRunning$$.next(false);
    }

}