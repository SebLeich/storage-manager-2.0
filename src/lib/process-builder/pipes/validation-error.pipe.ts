import { Pipe, PipeTransform } from '@angular/core';
import { ValidationError } from '../globals/validation-error';

@Pipe({
  name: 'validationError'
})
export class ValidationErrorPipe implements PipeTransform {

  naming: string[] = [];

  constructor() {
    this.naming[ValidationError.MultipleOutgoingSequenceFlowsFromNoneGatewayShape] = 'multiple outgoing sequence flows';
    this.naming[ValidationError.NoEndEvent] = 'no end event';
    this.naming[ValidationError.NoStartEvent] = 'no start event';
    this.naming[ValidationError.SequenceEndWithoutEndEvent] = 'sequence ends without end event';
    this.naming[ValidationError.MultipleStartEvents] = 'multiple start events';
  }

  transform(value: ValidationError): string {

    return this.naming[value] ?? 'unknown error';

  }

}
