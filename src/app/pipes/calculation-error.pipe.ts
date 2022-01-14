import { Pipe, PipeTransform } from '@angular/core';
import { CALCULATION_ERROR } from '../components/main/calculation/calculation-component.classes';

@Pipe({
  name: 'calculationError'
})
export class CalculationErrorPipe implements PipeTransform {

  transform(code: CALCULATION_ERROR): string {
    switch (code) {

      case CALCULATION_ERROR.CONTAINER_NOT_READY:
        return 'der Container ist nicht bereit für die Berechnung';

      case CALCULATION_ERROR.ALGORITHM_NOT_IMPLEMENTED:
        return 'der Algorithmus ist momentan nicht verfügbar';

      default:
        return `unbekannter Fehler (${code})`
    }
  }

}
