import { Component, Input } from '@angular/core';
import { IGood } from 'src/app/interfaces/i-good.interface';

@Component({
  selector: 'app-good-preview',
  templateUrl: './good-preview.component.html',
  styleUrls: ['./good-preview.component.css']
})
export class GoodPreviewComponent {

  @Input() good!: IGood;

  columns: string[] = [];

  constructor() { }

}
