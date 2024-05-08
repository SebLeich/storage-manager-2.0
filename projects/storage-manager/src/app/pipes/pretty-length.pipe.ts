import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { units } from '../globals';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { selectUnit } from '@smgr/store';

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
    let index = units.findIndex(x => x.unit === unit);
    while (converted >= (units[index!]?.threshold ?? Infinity)) {
      converted = converted / (units[index!]?.next ?? 1);
      index++;
      unit = units[index].unit as any;
    }
    const stringified = hideDecimalDigitsWhenZero ? `${parseFloat(converted.toFixed(decimalDigits))} ${unit}` : `${converted.toFixed(decimalDigits)} ${unit}`;
    return stringified.replace('.', ',');
  }

}
