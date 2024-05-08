import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'computedStyle'
})
export class ComputedStylePipe implements PipeTransform {

  public transform(element: HTMLElement, property: keyof CSSStyleDeclaration = 'backgroundColor') {
    return window.getComputedStyle(element, null)[property];
  }

}
