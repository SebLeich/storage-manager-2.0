import IPipeline from '@/lib/pipeline-store/interfaces/pipeline.interface';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-pipeline',
  templateUrl: './select-pipeline.component.html',
  styleUrls: ['./select-pipeline.component.scss'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectPipelineComponent), multi: true }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectPipelineComponent implements ControlValueAccessor {
  @Input() public displayPrefix = true;
  @Input() public prefix = 'Run pipeline';
  @Input() public pipelines: IPipeline[] | null = [];
  @Input() public currentPipeName: string | null = null;

  @Output() public currentPipelineRenamed = new EventEmitter<string>();

  public control = new FormControl<string | null>(null);

  private _onTouched?: () => void;
  private _onChange?: (value: string | null) => void;

  public blurElement(element: HTMLElement, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    element.blur();
  }

  public changed(value: string | null){
    if(typeof this._onChange !== 'function') return;

    this._onChange(value);
  }

  public touched(){
    if(typeof this._onTouched !== 'function') return;

    this._onTouched();
  }

  public registerOnChange(fn: (value: string | null) => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  public renameCurrentPipeline(updatedName: string){
    this.currentPipelineRenamed.emit(updatedName);
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.control[isDisabled ? 'disable' : 'enable']();
  }

  public writeValue(pipeline: string | null): void {
    this.control.setValue(pipeline);
  }
}
