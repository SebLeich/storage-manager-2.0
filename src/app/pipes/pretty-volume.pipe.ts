import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { nextUnitSize } from '../globals';

import * as fromICalculationContextState from 'src/app/store/reducers/i-calculation-context.reducers';
import { selectUnit } from '../store/selectors/i-calculation-context.selectors';

@Pipe({
  name: 'prettyVolume'
})
export class PrettyVolumePipe implements PipeTransform {

  constructor(private _calculationContextStore: Store<fromICalculationContextState.State>,) {

  }

  async transform(value: number, prettify: boolean = true): Promise<string> {
    let unit = await selectSnapshot(this._calculationContextStore.select(selectUnit));
    if (!prettify) return `${value} ${unit}³`;
    let converted = value;
    let index = nextUnitSize.findIndex(x => x.unit === unit);
    while (converted > (nextUnitSize[index!].threshold ?? Infinity)) {
      converted = converted / (Math.pow((nextUnitSize[index!].next ?? 1), 3));
      index++;
      unit = nextUnitSize[index].unit as any;
    }
    return `${converted.toFixed(2)} ${unit}³`;
  }

}
