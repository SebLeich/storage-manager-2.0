import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IParamDefinition } from 'src/lib/process-builder/globals/i-param-definition';

@Component({
  selector: 'app-embedded-input-output-mapping-table-row',
  templateUrl: './embedded-input-output-mapping-table-row.component.html',
  styleUrls: ['./embedded-input-output-mapping-table-row.component.css']
})
export class EmbeddedInputOutputMappingTableRowComponent implements OnInit {

  @ViewChild('rowTemplate') rowTemplate: TemplateRef<any>;
  
  @Input() level: number = 0;
  @Input() def!: IParamDefinition;

  constructor() { }

  ngOnInit(): void {
    console.log(this.def);
  }

}
