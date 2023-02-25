import { Pipe, PipeTransform } from '@angular/core';
import { IDynamicInputParamsConfig } from '../interfaces/dynamic-input-params-config.interface';

@Pipe({
  name: 'dynamicInputParams'
})
export class DynamicInputParamsPipe implements PipeTransform {

  public transform(config: IDynamicInputParamsConfig | boolean | null | undefined): string {
    if (config === null || typeof config !== 'object') {
      return config ? 'dynamic input params used' : 'no dynamic input params used';
    }
    return config.typeLimits?.length === 0? 'no dynamic input params used': `dynamic input params of the following types allowed: ${config.typeLimits?.join(', ')}`;
  }

}
