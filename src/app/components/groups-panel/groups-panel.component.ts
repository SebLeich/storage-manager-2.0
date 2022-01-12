import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/classes';
import { GROUPS_PROVIDER, IGroupsProvider } from 'src/app/interfaces';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.css']
})
export class GroupsPanelComponent implements OnDestroy, OnInit {

  columns: string[] = [ 'desc', 'color' ];

  private _subscriptions: Subscription[] = [];

  constructor(
    @Inject(GROUPS_PROVIDER) public groupsProvider: IGroupsProvider,
    private _visualizerComponentService: VisualizerComponentService
  ) { }

  ngOnDestroy(): void {
      for(let sub of this._subscriptions) sub.unsubscribe();
      this._subscriptions = [];
  }

  ngOnInit(): void {

  }

  setGroupColor(event: InputEvent, group: Group){
    group._Color = (event.target as HTMLInputElement).value;
    this._visualizerComponentService.updateGroupColors();
  }

}
