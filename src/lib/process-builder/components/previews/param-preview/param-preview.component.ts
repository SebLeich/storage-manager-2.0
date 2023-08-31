import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IParam } from '@process-builder/interfaces';

@Component({
  selector: 'app-param-preview',
  templateUrl: './param-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParamPreviewComponent {

  @Input() public param?: IParam;

}
