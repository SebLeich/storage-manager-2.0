import { Pipe, PipeTransform } from '@angular/core';
import { apiCallAuthorizationTypeToString, API_CALL_AUTHORIZATION } from '../globals';

@Pipe({
  name: 'apiAuthorizationType'
})
export class ApiAuthorizationTypePipe implements PipeTransform {

  transform(value: API_CALL_AUTHORIZATION | null): string {
    if (!value) {
      return '';
    }
    return apiCallAuthorizationTypeToString(value);
  }

}
