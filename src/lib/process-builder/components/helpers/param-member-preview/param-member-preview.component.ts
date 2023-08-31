import { Component, Input } from '@angular/core';
import { IParamMember } from 'src/lib/process-builder/interfaces/param-member.interface';

@Component({
  selector: 'app-param-member-preview',
  templateUrl: './param-member-preview.component.html',
  styleUrls: ['./param-member-preview.component.css']
})
export class ParamMemberPreviewComponent {

  @Input() paramMember!: IParamMember;

  constructor() { }

}
