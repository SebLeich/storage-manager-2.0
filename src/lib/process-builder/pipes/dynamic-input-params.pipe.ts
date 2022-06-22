import { Pipe, PipeTransform } from '@angular/core';
import { IDynamicInputParamsConfig } from '../globals/i-dynamic-input-params-config';

@Pipe({
  name: 'dynamicInputParams'
})
export class DynamicInputParamsPipe implements PipeTransform {

  transform(config: IDynamicInputParamsConfig | boolean): string {
    if(typeof config === 'boolean') return config? 'dynamic input params used': 'no dynamic input params used';
    return `dynamic input params of the following types allowed: ${config.typeLimits?.join(', ')}`;
  }

}
