import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, take } from 'rxjs/operators';
import { Container, Dimension, Good, Group, Order, Product, Solution } from '../classes';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _currentSolution: ReplaySubject<Solution> = new ReplaySubject<Solution>(1);
  currentSolution$ = this._currentSolution.pipe(distinctUntilChanged());
  currentGroups$ = this._currentSolution.pipe(map(x => x._Groups));

  private _groups = new BehaviorSubject<Group[]>([]);
  groups$ = this._groups.asObservable();
  get groups(){
    return this._groups.value;
  }

  private _orders = new BehaviorSubject<Order[]>([]);
  orders$ = this._orders.asObservable();

  private _containerWidth = new ReplaySubject<number>(1);
  private _containerHeight = new ReplaySubject<number>(1);
  containerWidth$ = this._containerWidth.asObservable();
  containerHeight$ = this._containerHeight.asObservable();
  containerValid$ = combineLatest([this.containerHeight$, this.containerWidth$]).pipe(map(([height, width]) => typeof height === 'number' && typeof width === 'number' && height > 0 && width > 0));

  private _products = new BehaviorSubject<Product[]>([]);
  products$ = this._products.asObservable();

  private _solutions: BehaviorSubject<Solution[]> = new BehaviorSubject<Solution[]>([]);

  private _unit: BehaviorSubject<'mm' | 'cm' | 'dm' | 'm'> = new BehaviorSubject('mm');
  unit$ = this._unit.asObservable();

  get unit() {
    return this._unit.value;
  }

  constructor() { }

  addGroup(group: Group) {
    let existing = this._groups.value;
    if (typeof group._Id !== 'number' || existing.findIndex(x => x._Id === group._Id) > -1) group._Id = Math.max(...existing.map(x => x._Id), 0) + 1;
    this._groups.next([...existing, group]);
  }

  addGroups(groups: Group[]) {
    let existing = this._groups.value;
    for (let group of groups) {
      if (typeof group._Id !== 'number' || existing.findIndex(x => x._Id === group._Id) > -1) group._Id = Math.max(...existing.map(x => x._Id), 0) + 1;
    }
    this._groups.next([...existing, ...groups]);
  }

  addProduct = (product: Product) => this._products.next([...this._products.value, product]);
  addProducts = (products: Product[]) => this._products.next([...this._products.value, ...products]);

  downloadCurrentSolution() {
    this._currentSolution.pipe(take(1)).subscribe((solution: Solution) => {
      var sJson = JSON.stringify(solution);
      var element = document.createElement('a');
      element.setAttribute('href', `data:text/json;charset=UTF-8,${encodeURIComponent(sJson)}`);
      element.setAttribute('download', `${solution._Description}.json`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  }

  setContainerHeight = (height: number) => this._containerHeight.next(height);
  setContainerWidth = (width: number) => this._containerWidth.next(width);
  setUnit = (unit: 'mm' | 'cm' | 'dm' | 'm') => this._unit.next(unit);

  setCurrentSolution(solution: Solution) {
    if (this._solutions.value.findIndex(x => x._Id === solution._Id) === -1) this._solutions.next([...this._solutions.value, solution]);
    this._currentSolution.next(solution);
    this.addGroups(solution._Groups);
  }

  setOrders(orders: Order[]) {
    this._orders.next(orders);
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
