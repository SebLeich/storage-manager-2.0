import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IParam } from 'src/lib/process-builder/interfaces/param.interface';

@Component({
  selector: 'app-param-preview',
  templateUrl: './param-preview.component.html',
  styleUrls: ['./param-preview.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParamPreviewComponent {

  @Input() public param?: IParam;

}
