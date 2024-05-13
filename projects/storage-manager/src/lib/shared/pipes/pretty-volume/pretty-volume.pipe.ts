import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { selectUnit } from '@smgr/store';

@Pipe({
    name: 'prettyVolume'
})
export class PrettyVolumePipe implements PipeTransform {

    constructor(private _store: Store) { }

    public async transform(value: number, prettify: boolean = true, decimalDigits: number = 2, hideDecimalDigitsWhenZero: boolean = false): Promise<string> {
        let unit = await selectSnapshot(this._store.select(selectUnit));
        if (!prettify) {
            return `${value} ${unit}³`;
        }

        let converted = value,
            index = this._units.findIndex(entry => entry.unit === unit);

        while (converted >= (this._units[index!].threshold ?? Infinity)) {
            converted = converted / (Math.pow((this._units[index!].next ?? 1), 3));
            index++;
            unit = this._units[index!].unit as any;
        }
        
        const stringified = hideDecimalDigitsWhenZero ? `${parseFloat(converted.toFixed(decimalDigits))} ${unit}³` : `${converted.toFixed(decimalDigits)} ${unit}³`;
        return stringified.replace('.', ',');
    }

    private _units = [
        { unit: 'mm', next: 10, threshold: 100 },
        { unit: 'cm', next: 100, threshold: 100 },
        { unit: 'm', next: 1000, threshold: 1000 },
        { unit: 'km', next: null, threshold: null },
    ];

}
