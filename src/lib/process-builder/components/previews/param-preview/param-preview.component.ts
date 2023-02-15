import { Component, Input, OnInit } from '@angular/core';
import { IParam } from 'src/lib/process-builder/interfaces/param.interface';

@Component({
  selector: 'app-param-preview',
  templateUrl: './param-preview.component.html',
  styleUrls: ['./param-preview.component.sass']
})
export class ParamPreviewComponent {

  @Input() param?: IParam;

}
