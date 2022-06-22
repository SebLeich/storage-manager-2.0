import { Component, Input, OnInit } from '@angular/core';
import { IParam } from 'src/lib/process-builder/globals/i-param';

@Component({
  selector: 'app-param-preview',
  templateUrl: './param-preview.component.html',
  styleUrls: ['./param-preview.component.sass']
})
export class ParamPreviewComponent implements OnInit {

  @Input() param!: IParam;

  constructor() { }

  ngOnInit(): void {
  }

}
