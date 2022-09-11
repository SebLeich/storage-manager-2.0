import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { nextUnitSize } from '../globals';

import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { selectUnit } from '../store/selectors/i-calculation-attribute.selectors';

@Pipe({
  name: 'prettyLength'
})
export class PrettyLengthPipe implements PipeTransform {

  constructor(private _store: Store) { }

  async transform(value: number | null | undefined, decimalDigits: number = 2, hideDecimalDigitsWhenZero: boolean = false, unit?: string): Promise<string> {
    if (!value) {
      return 'no entries';
    }
    let converted = value;
    if(!unit){
      unit = await selectSnapshot(this._store.select(selectUnit));
    }
    let index = nextUnitSize.findIndex(x => x.unit === unit);
    while (converted >= (nextUnitSize[index!]?.threshold ?? Infinity)) {
      converted = converted / (nextUnitSize[index!]?.next ?? 1);
      index++;
      unit = nextUnitSize[index].unit as any;
    }
    const stringified = hideDecimalDigitsWhenZero ? `${parseFloat(converted.toFixed(decimalDigits))} ${unit}` : `${converted.toFixed(decimalDigits)} ${unit}`;
    return stringified.replace('.', ',');
  }

}
