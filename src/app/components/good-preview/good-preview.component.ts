import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IGood } from '@smgr/interfaces';

@Component({
  selector: 'app-good-preview',
  templateUrl: './good-preview.component.html',
  styleUrls: ['./good-preview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodPreviewComponent {
  @Input() public good!: IGood;
}
