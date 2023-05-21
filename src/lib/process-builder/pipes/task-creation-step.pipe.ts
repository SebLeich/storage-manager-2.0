import { Pipe, PipeTransform } from '@angular/core';
import { TaskCreationStep } from '../globals/task-creation-step';

@Pipe({
  name: 'taskCreationStep'
})
export class TaskCreationStepPipe implements PipeTransform {

  public config = {
    [TaskCreationStep.ConfigureErrorGatewayEntranceConnection]: 'error input: event type',
    [TaskCreationStep.ConfigureFunctionSelection]: 'select function',
    [TaskCreationStep.ConfigureFunctionImplementation]: 'implementation',
    [TaskCreationStep.ConfigureFunctionOutput]: 'output structure',
    [TaskCreationStep.ConfigureFunctionInput]: 'select input',
    [TaskCreationStep.ConfigureInputOutputMapping]: 'data mapping',
    [TaskCreationStep.ConfigureStaticOutput]: 'static output'
  };

  public transform(value: TaskCreationStep): string {
    return this.config[value as keyof typeof this.config];
  }

}
