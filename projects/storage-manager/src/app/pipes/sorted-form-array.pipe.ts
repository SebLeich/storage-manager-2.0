import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SortDirection } from '@angular/material/sort';
import { compare } from 'src/app/globals';

@Pipe({
  name: 'sortedFormArray'
})
export class SortedFormArrayPipe implements PipeTransform {

  transform(value: AbstractControl[], active: string, direction: SortDirection, counter: number): { key: number, value: AbstractControl }[] {
    let output = [];
    var index = 0;
    let sequence = value
      .map((value, index) => { return { index: index, value: value.value[active]} })
      .sort((a, b) => compare(a.value, b.value, direction === 'asc'));
    for(let entry of sequence){
      output.push({ key: index, value: value[entry.index] });
      index++;
    }
    return output;
  }

}
