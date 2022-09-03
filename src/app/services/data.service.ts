import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { Good, Solution } from '../classes';
import { compare } from '../globals';
import { IGroup } from '../interfaces/i-group.interface';
import { SolutionValidationService } from './solution-validation.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _currentSolution = new BehaviorSubject<Solution | null>(null);
  currentSolution$ = this._currentSolution.pipe(distinctUntilChanged());
  currentSolutionValidation$ = this.currentSolution$.pipe(distinctUntilChanged(), map(solution => this._solutionValidationService.validateSolution(solution!)));
  currentContainer$ = this.currentSolution$.pipe(filter(solution => !!solution), map((solution) => solution!.container));
  currentGroups$ = this.currentSolution$.pipe(filter(solution => !!solution), map((solution) => solution!.groups));
  currentSolutionAvailable$ = this._currentSolution.pipe(map(x => x ? true : false));
  currentSteps$ = this.currentSolution$.pipe(filter(solution => !!solution), map((solution) => solution!.steps));

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
    private _solutionValidationService: SolutionValidationService,
    private _httpClient: HttpClient,

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
    const solution = await selectSnapshot(this.currentSolution$);
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

  getSolutionByAlgorithm(algorithm: string): Observable<Solution | null | undefined> {
    return this._solutions.pipe(map(solutions => solutions.find(solution => solution.algorithm === algorithm)));
  }

  async loadDefaultSolution(): Observable<Solution> {

    let subject = new Subject<Solution>();
    this._httpClient.get('./assets/exampleSolution.json')
      .subscribe(
        (solution: Solution) => {
          this.setCurrentSolution(solution);
          subject.next(solution);
          subject.complete();
        },
        (error) => subject.error(error)
      );
    return subject.asObservable();
  }

  setContainerHeight = (height: number) => this._containerHeight.next(height);
  setContainerWidth = (width: number) => this._containerWidth.next(width);
  setUnit = (unit: 'mm' | 'cm' | 'dm' | 'm') => this._unit.next(unit);

  static getContainerDimension(container: Container): Dimension {
    let dimension = new Dimension(container.width, container.height, container.length);
    dimension.x = 0;
    dimension.y = 0;
    dimension.z = 0;
    return dimension;
  }

  static getGoodDimension(good: Good): Dimension {
    let dimension = new Dimension(good.width, good.height, good.length);
    dimension.x = good.x;
    dimension.y = good.y;
    dimension.z = good.z;
    return dimension;
  }
}
