import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { selectUnit } from '@smgr/store';
import { units } from '../globals';

@Pipe({
  name: 'prettyVolume'
})
export class PrettyVolumePipe implements PipeTransform {

  constructor(private _store: Store) { }

  public async transform(value: number, prettify: boolean = true, decimalDigits: number = 2, hideDecimalDigitsWhenZero: boolean = false): Promise<string> {
    let unit = await selectSnapshot(this._store.select(selectUnit));
    if (!prettify) return `${value} ${unit}³`;
    let converted = value;
    let index = units.findIndex(x => x.unit === unit);
    while (converted >= (units[index!].threshold ?? Infinity)) {
      converted = converted / (Math.pow((units[index!].next ?? 1), 3));
      index++;
      unit = units[index!].unit as any;
    }
    const stringified = hideDecimalDigitsWhenZero ? `${parseFloat(converted.toFixed(decimalDigits))} ${unit}³` : `${converted.toFixed(decimalDigits)} ${unit}³`;
    return stringified.replace('.', ',');
  }

}
