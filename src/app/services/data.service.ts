import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { Dimension } from '../classes/dimension.class';
import { compare } from '../globals';
import { IGroup } from '../interfaces/i-group.interface';
import defaultSolution from 'src/assets/exampleSolution.json';
import { Store } from '@ngrx/store';

import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';

import { addSolution } from '../store/actions/i-solution.actions';
import { ISolution } from '../interfaces/i-solution.interface';
import { IContainer } from '../interfaces/i-container.interface';
import { selectCurrentSolution } from '../store/selectors/i-solution.selectors';
import { IGood } from '../interfaces/i-good.interface';
import { IDimension } from '../interfaces/i-dimension.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _groups = new BehaviorSubject<IGroup[]>([]);
  groups$ = this._groups.asObservable();
  ascSortedGroups$ = this.groups$.pipe(map((groups: IGroup[]) => groups.sort((a, b) => compare(a.id, b.id, true))));
  descSortedGroups$ = this.groups$.pipe(map((groups: IGroup[]) => groups.sort((a, b) => compare(a.id, b.id, false))));
  get groups() {
    return this._groups.value;
  }

  private _containerWidth = new BehaviorSubject<number | null>(null);
  private _containerHeight = new BehaviorSubject<number | null>(null);
  containerWidth$ = this._containerWidth.asObservable();
  containerHeight$ = this._containerHeight.asObservable();
  containerValid$ = combineLatest([this.containerHeight$, this.containerWidth$]).pipe(map(([height, width]) => typeof height === 'number' && typeof width === 'number' && height > 0 && width > 0));

  private _unit = new BehaviorSubject<'mm' | 'cm' | 'dm' | 'm'>('mm');
  unit$ = this._unit.asObservable();

  get unit() {
    return this._unit.value;
  }

  constructor(
    private _solutionStore: Store<fromISolutionState.State>,
  ) { }

  addGroup(group: IGroup) {
    let existing = this._groups.value;
    if (existing.findIndex(x => x.desc === group.desc) > -1) return;
    if (typeof group.id !== 'number' || existing.findIndex(x => x.id === group.id) > -1) group.id = Math.max(...existing.map(x => x.id), 0) + 1;
    this._groups.next([...existing, group]);
  }

  addGroups(groups: IGroup[]) {
    let existing = this._groups.value;
    groups = groups.filter(x => existing.findIndex(y => y.desc === x.desc) === -1);
    for (let group of groups) {
      if (typeof group.id !== 'number' || existing.findIndex(x => x.id === group.id) > -1) group.id = Math.max(...existing.map(x => x.id), 0) + 1;
    }
    this._groups.next([...existing, ...groups]);
  }

  async downloadCurrentSolution() {
    const solution = await selectSnapshot(this._solutionStore.select(selectCurrentSolution));
    if (!solution) {
      return;
    }

    var sJson = JSON.stringify(solution);
    var element = document.createElement('a');
    element.setAttribute('href', `data:text/json;charset=UTF-8,${encodeURIComponent(sJson)}`);
    element.setAttribute('download', `${solution.description}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  loadDefaultSolution(): ISolution {
    this._solutionStore.dispatch(addSolution({ solution: defaultSolution }));
    return { ...defaultSolution };
  }

  setContainerHeight = (height: number) => this._containerHeight.next(height);
  setContainerWidth = (width: number) => this._containerWidth.next(width);
  setUnit = (unit: 'mm' | 'cm' | 'dm' | 'm') => this._unit.next(unit);

  static getContainerDimension(container: IContainer): Dimension {
    let dimension = new Dimension(container.width, container.height, container.length);
    dimension.xCoord = 0;
    dimension.yCoord = 0;
    dimension.zCoord = 0;
    return dimension;
  }

  static getGoodDimension(good: IGood): IDimension {
    let dimension = new Dimension(good.width, good.height, good.length);
    dimension.xCoord = good.xCoord;
    dimension.yCoord = good.yCoord;
    dimension.zCoord = good.zCoord;
    return dimension;
  }
}
