import { Component, Input } from '@angular/core';
import { IGood } from 'src/app/interfaces/i-good.interface';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

@Component({
  selector: 'app-goods-panel',
  templateUrl: './goods-panel.component.html',
  styleUrls: ['./goods-panel.component.css']
})
export class GoodsPanelComponent {

  @Input() public goods: IGood[] = [];

  public columns: string[] = ['desc', 'height', 'width', 'length'];

  constructor(
    private _visualizerComponentService: VisualizerComponentService
  ) { }

  public hoverGood = (good: IGood) => this._visualizerComponentService.highlightGood(good);
  public selectGood = (good: IGood) => this._visualizerComponentService.selectGood(good);

}
