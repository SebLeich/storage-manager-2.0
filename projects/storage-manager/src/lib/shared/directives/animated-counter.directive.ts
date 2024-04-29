import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { animationFrameScheduler, BehaviorSubject, combineLatest, distinctUntilChanged, endWith, interval, map, ReplaySubject, startWith, Subscription, switchMap, takeWhile } from 'rxjs';

@Directive({
  selector: '[appAnimatedCounter]'
})
export class AnimatedCounterDirective implements OnDestroy, OnInit {

  @Input() public set animationDuration(duration: number) {
    this._animationDuration.next(duration);
  }
  @Input() public set value(value: number) {
    this._value.next(value);
  }

  private _animationDuration = new BehaviorSubject<number>(1000);
  private _value = new ReplaySubject<number>(1);

  private readonly currentCount$ = combineLatest([this._value, this._animationDuration]).pipe(
    switchMap(([value, animationDuration]) => {
      const frameDuration = animationDuration / 30;
      const totalFrames = Math.round(animationDuration / frameDuration);
      return interval(frameDuration, animationFrameScheduler).pipe(
        map((currentFrame) => currentFrame / totalFrames),
        takeWhile((progress) => progress <= 1),
        map((progress) => progress * (2 - progress)),
        map((progress) => Math.round(progress * value)),
        endWith(value),
        distinctUntilChanged()
      );
    }),
    startWith(0)
  );

  private _subscriptions = new Subscription();

  constructor(private counter: ElementRef) { }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    this._subscriptions.add(
      this.currentCount$
        .subscribe(
          (currentCount) => {
            const count = currentCount.toFixed(0);
            (this.counter.nativeElement as HTMLSpanElement).textContent = count;
          })
    );
  }

}
