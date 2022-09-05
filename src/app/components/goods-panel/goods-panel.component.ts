import { Component, Inject } from '@angular/core';
import { GOODS_PROVIDER, IGoodsProvider } from 'src/app/interfaces';
import { IGood } from 'src/app/interfaces/i-good.interface';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

@Component({
  selector: 'app-goods-panel',
  templateUrl: './goods-panel.component.html',
  styleUrls: ['./goods-panel.component.css']
})
export class GoodsPanelComponent {

  columns: string[] = ['desc', 'height', 'width', 'length'];

  constructor(
    @Inject(GOODS_PROVIDER) public goodsProvider: IGoodsProvider,
    private _visualizerComponentService: VisualizerComponentService
  ) { }

  hoverGood = (good: IGood) => this._visualizerComponentService.highlightGood(good);
  selectGood = (good: IGood) => this._visualizerComponentService.selectGood(good);

}
