import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormControl } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { IGroup } from 'src/app/interfaces/i-group.interface';

@Component({
  selector: 'app-groups-form',
  templateUrl: './groups-form.component.html',
  styleUrls: ['./groups-form.component.css']
})
export class GroupsFormComponent implements OnInit {

  public columns: string[] = ['sequenceNumber', 'desc', 'color', 'controls'];
  public groupsControl!: FormArray<FormControl<IGroup>>;
  public active: string = 'sequenceNumber';
  public direction: SortDirection = 'asc';

  constructor(private _controlContainer: ControlContainer) { }

  public ngOnInit(): void {
    this.groupsControl = this._controlContainer.control as FormArray;
  }

  public removeGroup(index: number) {
    this.groupsControl.removeAt(index);
  }

}
