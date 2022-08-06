import { Component, Input, OnInit } from '@angular/core';
import { IParamMember } from 'src/lib/process-builder/globals/i-param-member';

@Component({
  selector: 'app-param-member-preview',
  templateUrl: './param-member-preview.component.html',
  styleUrls: ['./param-member-preview.component.css']
})
export class ParamMemberPreviewComponent implements OnInit {

  @Input() paramMember!: IParamMember;

  constructor() { }

  ngOnInit(): void {
    debugger;
  }

}
