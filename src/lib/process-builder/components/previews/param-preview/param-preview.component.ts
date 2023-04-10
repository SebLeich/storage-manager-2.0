import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IParam } from 'src/lib/process-builder/interfaces/param.interface';

@Component({
  selector: 'app-param-preview',
  templateUrl: './param-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParamPreviewComponent {

  @Input() public param?: IParam;

}
