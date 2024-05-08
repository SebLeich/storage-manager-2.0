import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IFunction } from '@process-builder/interfaces';

@Component({
  selector: 'app-function-preview',
  templateUrl: './function-preview.component.html',
  styleUrls: ['./function-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionPreviewComponent {
  @Input() public func: IFunction | undefined;
  @Input() public inputsMissing = false;

  public customImplementationRequiredText = 'JS code required';

}
