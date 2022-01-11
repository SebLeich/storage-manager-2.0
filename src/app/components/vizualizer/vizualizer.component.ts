import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';
import { VizualizerComponentService } from './vizualizer-component-service';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-vizualizer',
  templateUrl: './vizualizer.component.html',
  styleUrls: ['./vizualizer.component.css'],
  providers: [
    VizualizerComponentService
  ]
})
export class VizualizerComponent implements OnDestroy, OnInit {

  @ViewChild('body', { static: true }) set bodyRef(ref: ElementRef<HTMLDivElement>) {
    this._body.next(ref);
  }
  private _body: ReplaySubject<ElementRef<HTMLDivElement>> = new ReplaySubject<ElementRef<HTMLDivElement>>(1);

  private _subscriptions: Subscription[] = [];

  constructor(
    private _vizualizerComponentService: VizualizerComponentService
  ) { }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
    this._vizualizerComponentService.dispose();
  }

  ngOnInit(): void {
    this._subscriptions.push(...[
      this._body.subscribe((body: ElementRef<HTMLDivElement>) => {
        this._vizualizerComponentService.setBody(body);
      }),
      this._vizualizerComponentService.resized$.pipe(switchMap(() => this._body.pipe(take(1)))).subscribe((ref: ElementRef<HTMLDivElement>) => {
        this._vizualizerComponentService.setSceneDimensions(ref.nativeElement.clientWidth, ref.nativeElement.clientHeight);
      })
    ]);
  }

  @HostListener('window:resize', ['$event'])
  onResize = (event) => this._vizualizerComponentService.triggerResizeEvent();


}
