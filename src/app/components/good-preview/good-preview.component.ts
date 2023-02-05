import { Component, Input } from '@angular/core';
import { IGood } from 'src/lib/storage-manager-store/interfaces/good.interface';

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
