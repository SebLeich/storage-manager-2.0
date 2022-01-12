import { Component, Input } from '@angular/core';
import { Good } from 'src/app/classes';

@Component({
  selector: 'app-good-preview',
  templateUrl: './good-preview.component.html',
  styleUrls: ['./good-preview.component.css']
})
export class GoodPreviewComponent {

  @Input() good: Good;

  columns: string[] = [];

  constructor() { }

}
