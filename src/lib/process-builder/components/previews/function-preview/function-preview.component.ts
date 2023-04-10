import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IFunction } from '../../../interfaces/function.interface';
import { IInputParam } from '../../../interfaces/input-param.interface';

@Component({
  selector: 'app-function-preview',
  templateUrl: './function-preview.component.html',
  styleUrls: ['./function-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionPreviewComponent implements OnChanges {

  public useInterface = false;
  public interface: number | undefined;
  public param: number | 'dynamic' | undefined;

  @Input() public func: IFunction | undefined;

  public inputParams: (IInputParam | 'dynamic')[] = [];

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges['func']) {
      this.useInterface = typeof simpleChanges['func'].currentValue.outputTemplate === 'number';
      this.interface = this.useInterface ? simpleChanges['func'].currentValue.outputTemplate as number : undefined;
      this.param = this.useInterface ? undefined : simpleChanges['func'].currentValue.output as number;
      this.inputParams = simpleChanges['func'].currentValue ? Array.isArray(simpleChanges['func'].currentValue.inputTemplates) ? simpleChanges['func'].currentValue.inputTemplates : typeof simpleChanges['func'].currentValue.inputTemplates === 'number' ? [simpleChanges['func'].currentValue.inputTemplates] : [] : [];
    }
  }

  public customImplementationRequiredText = 'Custom implementation required';

}
