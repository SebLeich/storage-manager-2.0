import { Pipe, PipeTransform } from '@angular/core';
import { SOLUTION_ERROR } from '../globals';

@Pipe({
  name: 'solutionValidationError'
})
export class SolutionValidationErrorPipe implements PipeTransform {

  transform(errorCode: SOLUTION_ERROR): string {
    switch (errorCode) {

      case SOLUTION_ERROR.NO_SOLUTION:
        return 'no solution';

      case SOLUTION_ERROR.NO_CONTAINER:
        return 'solution without container';

      case SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_X:
        return 'solution contains goods, positioned next to the container';

      case SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_X:
        return 'solution contains goods, jutting over the x edge of the container';

      case SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Y:
        return 'solution contains goods, positioned beneath the container';

      case SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Y:
        return 'solution contains goods, jutting over the y edge of the container';

      case SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Z:
        return 'solution contains goods, positioned behind the container';

      case SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Z:
        return 'solution contains goods, jutting over the z edge of the container';

      case SOLUTION_ERROR.GOOD_OVERLAP:
        return 'solution\' goods overlapping'

    }
  }

}
