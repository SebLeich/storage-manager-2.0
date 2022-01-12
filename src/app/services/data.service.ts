import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Container, Dimension, Good, Solution } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _currentSolution: ReplaySubject<Solution> = new ReplaySubject<Solution>(1);
  currentSolution$ = this._currentSolution.pipe(distinctUntilChanged());
  currentGroups$ = this._currentSolution.pipe(map(x => x._Groups));

  private _solutions: BehaviorSubject<Solution[]> = new BehaviorSubject<Solution[]>([]);

  private _unit: BehaviorSubject<'mm' | 'cm' | 'dm' | 'm'> = new BehaviorSubject('mm');
  unit$ = this._unit.asObservable();

  get unit(){
    return this._unit.value;
  }

  constructor() { }

  setCurrentSolution(solution: Solution){
    if(this._solutions.value.findIndex(x => x._Id === solution._Id) === -1) this._solutions.next([...this._solutions.value, solution]);
    this._currentSolution.next(solution);
  }

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
