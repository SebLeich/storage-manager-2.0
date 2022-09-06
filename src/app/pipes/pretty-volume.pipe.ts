import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { nextUnitSize } from '../globals';

import * as fromICalculationAttributesState from 'src/app/store/reducers/i-calculation-attribute.reducers';
import { selectUnit } from '../store/selectors/i-calculation-attribute.selectors';

@Pipe({
  name: 'prettyVolume'
})
export class PrettyVolumePipe implements PipeTransform {

  constructor(private _calculationAttributesStore: Store<fromICalculationAttributesState.State>,) {

  }

  async transform(value: number, prettify: boolean = true, decimalDigits: number = 2, hideDecimalDigitsWhenZero: boolean = false): Promise<string> {
    let unit = await selectSnapshot(this._calculationAttributesStore.select(selectUnit));
    if (!prettify) return `${value} ${unit}³`;
    let converted = value;
    let index = nextUnitSize.findIndex(x => x.unit === unit);
    while (converted >= (nextUnitSize[index!].threshold ?? Infinity)) {
      converted = converted / (Math.pow((nextUnitSize[index!].next ?? 1), 3));
      index++;
      unit = nextUnitSize[index!].unit as any;
    }
    const stringified = hideDecimalDigitsWhenZero ? `${parseFloat(converted.toFixed(decimalDigits))} ${unit}³` : `${converted.toFixed(decimalDigits)} ${unit}³`;
    return stringified.replace('.', ',');
  }

}
