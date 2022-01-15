import { Pipe, PipeTransform } from '@angular/core';
import { CALCULATION_ERROR } from '../components/main/calculation/calculation-component.classes';

@Pipe({
  name: 'calculationError'
})
export class CalculationErrorPipe implements PipeTransform {

  transform(code: CALCULATION_ERROR): string {
    switch (code) {

      case CALCULATION_ERROR.CONTAINER_NOT_READY:
        return 'Der Container ist nicht bereit für die Berechnung: es müssen Höhe und Breite angegeben werden und größer als 0 sein.';

      case CALCULATION_ERROR.ALGORITHM_NOT_IMPLEMENTED:
        return 'Der Algorithmus ist momentan nicht verfügbar.';

      default:
        return `Unbekannter Fehler (Code: ${code})`
    }
  }

}
