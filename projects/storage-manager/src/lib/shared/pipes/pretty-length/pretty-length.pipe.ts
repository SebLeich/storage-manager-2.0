import { Unit } from '@/app/types/unit.type';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'prettyLength'
})
export class PrettyLengthPipe implements PipeTransform {
    
    public transform(value: number | null | undefined, unit: Unit, decimalDigits: number = 2, hideDecimalDigitsWhenZero: boolean = false): string {
        let converted = value ?? 0;

        let index = this._units.findIndex(entry => entry.unit === unit);
        while (converted >= (this._units[index!]?.threshold ?? Infinity)) {
            converted = converted / (this._units[index!]?.next ?? 1);
            index++;
            unit = this._units[index].unit as any;
        }

        const stringified = hideDecimalDigitsWhenZero ? `${parseFloat(converted.toFixed(decimalDigits))} ${unit}` : `${converted.toFixed(decimalDigits)} ${unit}`;
        return stringified.replace('.', ',');
    }

    private _units = [
        { unit: 'mm', next: 10, threshold: 100 },
        { unit: 'cm', next: 100, threshold: 100 },
        { unit: 'm', next: 1000, threshold: 1000 },
        { unit: 'km', next: null, threshold: null },
    ];

}
