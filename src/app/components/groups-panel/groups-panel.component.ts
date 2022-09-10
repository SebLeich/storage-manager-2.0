import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IGroup } from 'src/app/interfaces/i-group.interface';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.css']
})
export class GroupsPanelComponent {

  @Input() public groups: IGroup[] = [];

  @Output() public groupColorChanged = new EventEmitter<{ group: IGroup, color: string }>();

  columns: string[] = ['desc', 'color'];

  constructor() { }

  public setGroupColor(event: InputEvent, group: IGroup) {
    this.groupColorChanged.emit({ group: group, color: (event.target as HTMLInputElement).value });
  }

}
