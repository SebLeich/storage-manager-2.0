import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { nextUnitSize } from '../globals';

import * as fromICalculationContextState from 'src/app/store/reducers/i-calculation-context.reducers';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { selectUnit } from '../store/selectors/i-calculation-context.selectors';

@Pipe({
  name: 'prettyLength'
})
export class PrettyLengthPipe implements PipeTransform {

  constructor(private _calculationContextStore: Store<fromICalculationContextState.State>) { }

  async transform(value: number | null | undefined): Promise<string> {
    if (!value) {
      return 'no entries';
    }
    let converted = value;
    let unit = await selectSnapshot(this._calculationContextStore.select(selectUnit));
    let index = nextUnitSize.findIndex(x => x.unit === unit);
    while (converted > (nextUnitSize[index!]?.threshold ?? Infinity)) {
      converted = converted / (nextUnitSize[index!]?.next ?? 1);
      index++;
      unit = nextUnitSize[index].unit as any;
    }
    return `${converted.toFixed(2)} ${unit}`;
  }

}
