import { Pipe, PipeTransform } from '@angular/core';
import { nextUnitSize } from '../globals';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'prettyLength'
})
export class PrettyLengthPipe implements PipeTransform {

  constructor(private _dataService: DataService){

  }

  transform(value: number): string {
    let converted = value;
    let unit = this._dataService.unit;
    let index = nextUnitSize.findIndex(x => x.unit === unit);
    while(converted > nextUnitSize[index].threshold){
      converted = converted/nextUnitSize[index].next;
      index++;
      unit = nextUnitSize[index].unit as any;
    }
    return `${converted.toFixed(2)} ${unit}`;
  }

}
