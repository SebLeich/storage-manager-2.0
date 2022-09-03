import { Pipe, PipeTransform } from '@angular/core';
import { nextUnitSize } from '../globals';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'prettyLength'
})
export class PrettyLengthPipe implements PipeTransform {

  constructor(private _dataService: DataService) {

  }

  transform(value: number | null | undefined): string {
    if (!value) {
      return 'no entries';
    }
    let converted = value;
    let unit = this._dataService.unit;
    let index = nextUnitSize.findIndex(x => x.unit === unit);
    while (converted > (nextUnitSize[index!]?.threshold ?? Infinity)) {
      converted = converted / (nextUnitSize[index!]?.next ?? 1);
      index++;
      unit = nextUnitSize[index].unit as any;
    }
    return `${converted.toFixed(2)} ${unit}`;
  }

}
