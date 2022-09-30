import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'computedStyle'
})
export class ComputedStylePipe implements PipeTransform {

  public transform(element: HTMLElement): string {
    return window.getComputedStyle(element, null).backgroundColor;
  }

}
