import { Pipe, PipeTransform } from '@angular/core';
import { nextUnitSize } from '../globals';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'prettyVolume'
})
export class PrettyVolumePipe implements PipeTransform {

  constructor(private _dataService: DataService) {

  }

  transform(value: number, prettify: boolean = true): string {
    let unit = this._dataService.unit;
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
