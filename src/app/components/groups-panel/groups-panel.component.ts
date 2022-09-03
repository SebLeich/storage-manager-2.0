import { Component, Inject } from '@angular/core';
import { GROUPS_PROVIDER, IGroupsProvider } from 'src/app/interfaces';
import { IGroup } from 'src/app/interfaces/i-group.interface';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.css']
})
export class GroupsPanelComponent {

  columns: string[] = [ 'desc', 'color' ];

  constructor(
    @Inject(GROUPS_PROVIDER) public groupsProvider: IGroupsProvider,
    private _visualizerComponentService: VisualizerComponentService
  ) { }

  setGroupColor(event: InputEvent, group: IGroup){
    group.color = (event.target as HTMLInputElement).value;
    this._visualizerComponentService.updateGroupColors();
  }

}
