import { Injectable } from '@angular/core';
import { Dimension, Good, Solution } from '../classes';
import { SOLUTION_ERROR } from '../globals';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SolutionValidationService {

  constructor() { }

  validateSolution(solution: Solution): { error: SOLUTION_ERROR, effectedGoods: Good[] }[] {
    if (solution === null) return [{ error: SOLUTION_ERROR.NO_SOLUTION, effectedGoods: [] }];
    if (solution.container === null) return [{ error: SOLUTION_ERROR.NO_CONTAINER, effectedGoods: [] }];
    let output = [];
    let goodsXError1 = solution.container.goods.filter(x => x.x < 0);
    if (goodsXError1.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_X, effectedGoods: goodsXError1 });
    let goodsXError2 = solution.container.goods.filter(x => (x.x + x.width) > solution.container.width);
    if (goodsXError2.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_X, effectedGoods: goodsXError2 });
    let goodsYError1 = solution.container.goods.filter(x => x.y < 0);
    if (goodsYError1.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Y, effectedGoods: goodsYError1 });
    let goodsYError2 = solution.container.goods.filter(x => (x.y + x.height) > solution.container.height);
    if (goodsYError2.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Y, effectedGoods: goodsYError2 });
    let goodsZError1 = solution.container.goods.filter(x => x.z < 0);
    if (goodsZError1.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Z, effectedGoods: goodsZError1 });
    let goodsZError2 = solution.container.goods.filter(x => (x.z + x.length) > solution.container.length);
    if (goodsZError2.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Z, effectedGoods: goodsZError2 });
    let dimensions = solution.container.goods.map(x => {
      return { good: x, dimension: DataService.getGoodDimension(x) };
    });
    for (let wrapper of dimensions) {
      let overlappingSet = this._cubeIsInAnotherCube(wrapper.dimension, Object.values(dimensions).map(x => x.dimension).filter(x => wrapper.dimension !== x));
      if (overlappingSet.length > 0) {
        output.push({ error: SOLUTION_ERROR.GOOD_OVERLAP, effectedGoods: [ wrapper.good, ...(overlappingSet.map(x => (dimensions.find(y => y.dimension === x)).good)) ] });
      }
    }
    return output;
  }

  private _cubeIsInAnotherCube(cube: Dimension, cubeSet: Dimension[]): Dimension[] {
    return cubeSet.filter(x => this._cubeIsInCube(cube, x));
  }

  private _cubeIsInCube(cube1: Dimension, cube2: Dimension) {
    let c1 = (cube1.x + cube1.width) <= cube2.x;
    let c2 = (cube2.x + cube2.width) <= cube1.x;
    let c3 = (cube1.y + cube1.height) <= cube2.y;
    let c4 = (cube2.y + cube2.height) <= cube1.y;
    let c5 = (cube1.z + cube1.length) <= cube2.z;
    let c6 = (cube2.z + cube2.length) <= cube1.z;
    return !c1 && !c2 && !c3 && !c4 && !c5 && !c6;
  }
}
