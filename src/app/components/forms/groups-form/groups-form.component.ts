import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { IGroup } from '@smgr/interfaces';
import { removeGroup } from '@smgr/store';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.scss']
})
export class GroupsFormComponent implements OnInit {

  public columns: string[] = ['sequenceNumber', 'desc', 'color', 'controls'];
  public groupsControl!: FormArray<FormControl<IGroup>>;
  public active: string = 'sequenceNumber';
  public direction: SortDirection = 'asc';

  constructor(private _controlContainer: ControlContainer, private _store: Store) { }

  public ngOnInit(): void {
    this.groupsControl = this._controlContainer.control as FormArray;
  }

  public removeGroup(index: number) {
    const group: IGroup = this.groupsControl.controls[index].value;
    this._store.dispatch(removeGroup({ removeGroup: group }));
  }

}
