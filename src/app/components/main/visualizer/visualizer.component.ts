import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { showAnimation } from 'src/app/animations';
import { selectedGoodEdgeColor } from 'src/app/globals';
import { VisualizerComponentService } from './visualizer-component-service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
  providers: [
    VisualizerComponentService
  ],
  animations: [ showAnimation ]
})
export class VisualizerComponent implements OnDestroy, OnInit {

  @ViewChild('visualizerWrapper', { static: false }) set visualizerWrapperRef(ref: ElementRef<HTMLDivElement>) {
    this.visualizerComponentService.setVisualizerWrapper(ref);
  }

  private _subscriptions: Subscription[] = [];

  constructor(
    public visualizerComponentService: VisualizerComponentService
  ) { }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
    this.visualizerComponentService.dispose();
  }

  ngOnInit(): void {
    this._subscriptions.push(...[
      this.visualizerComponentService.resized$.pipe(switchMap(() => this.visualizerComponentService.visualizerWrapper$.pipe(take(1)))).subscribe((ref: ElementRef<HTMLDivElement>) => {
        this.visualizerComponentService.setSceneDimensions(ref.nativeElement.clientWidth, ref.nativeElement.clientHeight);
      })
    ]);
  }

  @HostListener('window:resize', ['$event'])
  onResize = (event) => this.visualizerComponentService.triggerResizeEvent();

  @HostListener('document:keypress', ['$event'])
  onKeydown = (event) => this.visualizerComponentService.keydown(event);

  selectedGoodEdgeColor = selectedGoodEdgeColor;
}
