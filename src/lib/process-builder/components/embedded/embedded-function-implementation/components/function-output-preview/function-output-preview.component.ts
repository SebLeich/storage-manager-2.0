import { ParamType } from '@/lib/process-builder/types/param.type';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-function-output-preview',
  templateUrl: './function-output-preview.component.html',
  styleUrls: ['./function-output-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionOutputPreviewComponent {
  @Input() public outputParamType: ParamType | null = null;
  @Input() public outputParamName: string | null = null;
  @Input() public interfaceIdentifier: string | null = null;
}
