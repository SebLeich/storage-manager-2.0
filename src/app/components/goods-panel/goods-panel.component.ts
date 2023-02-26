import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGood } from '@smgr/interfaces';

@Component({
  selector: 'app-goods-panel',
  templateUrl: './goods-panel.component.html',
  styleUrls: ['./goods-panel.component.css']
})
export class GoodsPanelComponent {

  @Input() public goods: IGood[] = [];

  @Output() public hoveredGood = new EventEmitter<string | null>();
  @Output() public selectGood = new EventEmitter<string | null>();

  public columns: string[] = ['desc', 'height', 'width', 'length'];

  public goodHovered = (good: IGood) => this.hoveredGood.emit(good.id);
  public goodSelected = (good: IGood) => this.selectGood.emit(good.id);

}
