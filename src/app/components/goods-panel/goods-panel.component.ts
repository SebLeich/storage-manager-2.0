import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GOODS_PROVIDER, IGoodsProvider } from 'src/app/interfaces';
import { IGood } from 'src/app/interfaces/i-good.interface';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

@Component({
  selector: 'app-goods-panel',
  templateUrl: './goods-panel.component.html',
  styleUrls: ['./goods-panel.component.css']
})
export class GoodsPanelComponent implements OnDestroy, OnInit {

  columns: string[] = [ 'desc', 'height', 'width', 'length' ];

  private _subscriptions: Subscription[] = [];

  constructor(
    @Inject(GOODS_PROVIDER) public goodsProvider: IGoodsProvider,
    private _visualizerComponentService: VisualizerComponentService
  ) { }

  hoverGood = (good: IGood) => this._visualizerComponentService.highlightGood(good);

  ngOnDestroy(): void {
      for(let sub of this._subscriptions) sub.unsubscribe();
      this._subscriptions = [];
  }

  ngOnInit(): void {

  }

  selectGood = (good: IGood) => this._visualizerComponentService.selectGood(good);

}
