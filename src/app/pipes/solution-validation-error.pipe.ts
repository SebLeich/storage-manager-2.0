import { Pipe, PipeTransform } from '@angular/core';
import { SOLUTION_ERROR } from '../globals';

@Pipe({
  name: 'solutionValidationError'
})
export class SolutionValidationErrorPipe implements PipeTransform {

  transform(errorCode: SOLUTION_ERROR): string {
    switch (errorCode) {
      case SOLUTION_ERROR.NO_SOLUTION:
        return 'Keine Lösung';
      case SOLUTION_ERROR.NO_CONTAINER:
        return 'Lösung ohne Container';
      case SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_X:
        return 'Lösung enthält Güter, welche neben dem Container beginnen';
      case SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_X:
        return 'Lösung enthält Güter, welche über die Breite des Containers hinausragen';
      case SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Y:
        return 'Lösung enthält Güter, welche unter dem Container beginnen';
      case SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Y:
        return 'Lösung enthält Güter, welche über die Höhe des Containers hinausragen';
      case SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Z:
        return 'Lösung enthält Güter, welche hinter dem Container beginnen';
      case SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Z:
        return 'Lösung enthält Güter, welche über die Länge des Containers hinausragen';
      case SOLUTION_ERROR.GOOD_OVERLAP:
        return 'Gut überlappt sich mit einem anderen Gut';
    }
  }

}
