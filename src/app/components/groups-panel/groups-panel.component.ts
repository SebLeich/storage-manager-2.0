import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GROUPS_PROVIDER, IGroupsProvider } from 'src/app/interfaces';

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
  styleUrls: ['./groups-panel.component.css']
})
export class GroupsPanelComponent implements OnDestroy, OnInit {

  columns: string[] = [ 'desc', 'color' ];

  private _subscriptions: Subscription[] = [];

  constructor(
    @Inject(GROUPS_PROVIDER) public groupsProvider: IGroupsProvider
  ) { }

  ngOnDestroy(): void {
      for(let sub of this._subscriptions) sub.unsubscribe();
      this._subscriptions = [];
  }

  ngOnInit(): void {

  }

}
