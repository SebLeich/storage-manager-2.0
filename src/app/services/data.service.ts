import { Injectable } from '@angular/core';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { Dimension } from '../classes/dimension.class';
import { Store } from '@ngrx/store';

import * as fromISolutionState from 'src/app/store/reducers/i-solution.reducers';

import { IContainer } from '../interfaces/i-container.interface';
import { selectCurrentSolution } from '../store/selectors/i-solution.selectors';
import { IGood } from '../interfaces/i-good.interface';
import { IPosition } from '../interfaces/i-position';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _solutionStore: Store<fromISolutionState.State>,
  ) { }

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

  static getContainerDimension(container: IContainer): IPosition {
    let dimension = new Dimension(container.width, container.height, container.length);
    dimension.xCoord = 0;
    dimension.yCoord = 0;
    dimension.zCoord = 0;
    return dimension as any;
  }

  static getGoodDimension(good: IGood): IPosition {
    let dimension = new Dimension(good.width, good.height, good.length);
    dimension.xCoord = good.xCoord;
    dimension.yCoord = good.yCoord;
    dimension.zCoord = good.zCoord;
    return dimension as any;
  }
}
