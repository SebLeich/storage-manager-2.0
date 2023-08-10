import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IGroup } from '@smgr/interfaces';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsPanelComponent {

  @Input() public groups: IGroup[] = [];

  @Output() public groupColorChanged = new EventEmitter<{ group: IGroup, color: string }>();

  public columns: string[] = ['desc', 'color'];

  public setGroupColor(event: InputEvent, group: IGroup) {
    this.groupColorChanged.emit({ group: group, color: (event.target as HTMLInputElement).value });
  }

}
