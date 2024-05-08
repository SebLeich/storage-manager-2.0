import { Pipe, PipeTransform } from '@angular/core';
import { CalculationError } from '../components/main/calculation/enumerations/calculation-error';

@Pipe({
  name: 'calculationError'
})
export class CalculationErrorPipe implements PipeTransform {

  transform(code: CalculationError): string {
    switch (code) {

      case CalculationError.ContainerNotReady:
        return 'calculation failed: height and width should be setted higher than 0.';

      case CalculationError.AlgorithmNotImplemented:
        return 'algorithm not available yet';

      default:
        return `unknown error (code: ${code})`
    }
  }

}
