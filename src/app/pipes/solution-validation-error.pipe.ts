import { Pipe, PipeTransform } from '@angular/core';
import { SolutionError } from '../globals';

@Pipe({
  name: 'solutionValidationError'
})
export class SolutionValidationErrorPipe implements PipeTransform {

  transform(errorCode: SolutionError): string {
    switch (errorCode) {

      case SolutionError.NoSolution:
        return 'no solution';

      case SolutionError.NoContainer:
        return 'solution without container';

      case SolutionError.GoodBeforeContainerXCoord:
        return 'solution contains goods, positioned next to the container';

      case SolutionError.GoodOutOfContainerXCoord:
        return 'solution contains goods, jutting over the x edge of the container';

      case SolutionError.GoodBeforeContainerYCoord:
        return 'solution contains goods, positioned beneath the container';

      case SolutionError.GoodOutOfContainerYCoord:
        return 'solution contains goods, jutting over the y edge of the container';

      case SolutionError.GoodBeforeContainerZCoord:
        return 'solution contains goods, positioned behind the container';

      case SolutionError.GoodOutOfContainerZCoord:
        return 'solution contains goods, jutting over the z edge of the container';

      case SolutionError.GoodOverlap:
        return 'solution\' goods overlapping'

    }
  }

}
