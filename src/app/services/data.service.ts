import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Container, Dimension, Good } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _unit: BehaviorSubject<'mm' | 'cm' | 'dm' | 'm'> = new BehaviorSubject('mm');
  unit$ = this._unit.asObservable();

  get unit(){
    return this._unit.value;
  }

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

  static getGoodDimension(good: Good): Dimension {
    return {
      height: good._Height,
      width: good._Width,
      length: good._Length,
      x: good._X,
      y: good._Y,
      z: good._Z
    };
  }
}
