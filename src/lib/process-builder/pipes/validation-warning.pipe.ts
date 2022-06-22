import { Pipe, PipeTransform } from '@angular/core';
import { ValidationWarning } from '../globals/validation-warning';

@Pipe({
  name: 'validationWarning'
})
export class ValidationWarningPipe implements PipeTransform {

  naming: string[] = [];

  constructor() {
    this.naming[ValidationWarning.CyclicAccess] = 'cyclic process';
    this.naming[ValidationWarning.NoEndEvent] = 'no end event';
    this.naming[ValidationWarning.UnusedOutputParam] = 'unused output params';
    this.naming[ValidationWarning.UnreachableElement] = 'unreachable process element';
  }

  transform(value: ValidationWarning): string {

    return this.naming[value] ?? 'unknown error';

  }

}
