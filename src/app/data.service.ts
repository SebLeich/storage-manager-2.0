import { Injectable } from '@angular/core';
import { Container, Dimension } from './classes';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  static getContainerDimension(container: Container): Dimension {
    return {
      height: container._Height,
      width: container._Width,
      length: container._Length,
      x: 0,
      y: 0,
      z: 0
    };
  }
}
