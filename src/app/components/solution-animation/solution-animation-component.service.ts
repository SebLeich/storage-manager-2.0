import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, interval, timer } from "rxjs";
import { filter, map, switchMap, take, takeUntil, tap } from "rxjs/operators";
import { Step } from "src/app/classes";
import { DataService } from "src/app/services/data.service";
import { VisualizerComponentService } from "../main/visualizer/visualizer-component-service";

@Injectable()
export class SolutionAnimationComponentService {

    private _animationRunning = new BehaviorSubject<boolean>(false);
    private _stepIndex = new BehaviorSubject<number>(0);
    private _animationSpeed = new BehaviorSubject<number>(2);

    animationRunning$ = this._animationRunning.asObservable();
    animationSpeed$ = this._animationSpeed.asObservable();
    stepIndex$ = this._stepIndex.asObservable();
    currentStep$ = combineLatest([this._dataService.currentSteps$, this.stepIndex$]).pipe(map(([steps, index]: [Step[], number]) => steps[index]));

    constructor(
        private _visualizerComponentService: VisualizerComponentService,
        private _dataService: DataService
    ) {

    }

    setAnimationSpeed(value: number){
        if(value > 0 && value < 60) this._animationSpeed.next(value);
    }

    startAnimation() {
        this._dataService.currentSteps$.pipe(
            take(1),
            filter((steps: Step[]) => steps?.length > 0),
            tap((steps: Step[]) => {
                this._visualizerComponentService.clearScene();
                this._animationRunning.next(true);
            }),
            switchMap((steps: Step[]) => timer(0, this._animationSpeed.value * 1000)
                .pipe(
                    takeUntil(this._animationRunning.pipe(filter(x => x === false))),
                    map((index: number) => {
                        if (typeof steps[index] === 'undefined') {
                            this._animationRunning.next(false);
                            return null;
                        }
                        this._stepIndex.next(index);
                        return steps[index];
                    })
                )
            ),
            filter((step: Step) => step ? true : false)
        ).subscribe((step: Step) => this._visualizerComponentService.animateStep(step, false, true));
    }

    stopAnimation() {
        this._animationRunning.next(false);
    }

}