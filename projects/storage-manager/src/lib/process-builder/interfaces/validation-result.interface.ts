import { IElement } from 'src/lib/bpmn-io/interfaces/element.interface';
import { ValidationError } from '../globals/validation-error';
import { ValidationWarning } from '../globals/validation-warning';

export interface IProcessValidationResult {
  errors: { error: ValidationError; element?: IElement }[];
  warnings: { warning: ValidationWarning; element?: IElement }[];
}
