import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { GROUPS_PROVIDER, IGroupsProvider } from 'src/app/interfaces';
import { IGroup } from 'src/app/interfaces/i-group.interface';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.css']
})
export class GroupsPanelComponent {

  @Output() groupColorChanged = new EventEmitter<{ group: IGroup, color: string }>();
  columns: string[] = ['desc', 'color'];

  constructor(
    @Inject(GROUPS_PROVIDER) public groupsProvider: IGroupsProvider
  ) { }

  setGroupColor(event: InputEvent, group: IGroup) {
    this.groupColorChanged.emit({ group: group, color: (event.target as HTMLInputElement).value });
  }

}
