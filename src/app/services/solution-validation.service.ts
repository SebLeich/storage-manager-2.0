import { Injectable } from '@angular/core';
import { SOLUTION_ERROR } from '../globals';
import { IDimension } from '../interfaces/i-dimension.interface';
import { IGood } from '../interfaces/i-good.interface';
import { ISolution } from '../interfaces/i-solution.interface';
import { DataService } from './data.service';

@Injectable()
export class SolutionValidationService {

  constructor() { }

  static validateSolution(solution: ISolution): { error: SOLUTION_ERROR, effectedGoods: IGood[] }[] {
    if (solution === null) return [{ error: SOLUTION_ERROR.NO_SOLUTION, effectedGoods: [] }];
    if (!solution.container) return [{ error: SOLUTION_ERROR.NO_CONTAINER, effectedGoods: [] }];
    let output = [];
    let goodsXError1 = solution.container.goods.filter(x => x.xCoord < 0);
    if (goodsXError1.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_X, effectedGoods: goodsXError1 });
    let goodsXError2 = solution.container.goods.filter(x => (x.xCoord + x.width) > solution.container!.width);
    if (goodsXError2.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_X, effectedGoods: goodsXError2 });
    let goodsYError1 = solution.container.goods.filter(x => x.yCoord < 0);
    if (goodsYError1.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Y, effectedGoods: goodsYError1 });
    let goodsYError2 = solution.container.goods.filter(x => (x.yCoord + x.height) > solution.container!.height);
    if (goodsYError2.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Y, effectedGoods: goodsYError2 });
    let goodsZError1 = solution.container.goods.filter(x => x.zCoord < 0);
    if (goodsZError1.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_BEFORE_CONTAINER_Z, effectedGoods: goodsZError1 });
    let goodsZError2 = solution.container.goods.filter(x => (x.zCoord + x.length) > solution.container!.length);
    if (goodsZError2.length > 0) output.push({ error: SOLUTION_ERROR.GOOD_OUT_OF_CONTAINER_Z, effectedGoods: goodsZError2 });
    let dimensions = solution.container.goods.map(good => {
      return { good: good, dimension: DataService.getGoodDimension(good) };
    });
    for (let wrapper of dimensions) {
      let overlappingSet = this._cubeIsInAnotherCube(wrapper.dimension, Object.values(dimensions).map(x => x.dimension).filter(x => wrapper.dimension !== x));
      if (overlappingSet.length > 0) {
        output.push({
          error: SOLUTION_ERROR.GOOD_OVERLAP,
          effectedGoods: [wrapper.good, ...(overlappingSet.map(x => (dimensions.find(y => y.dimension === x))?.good))].filter(good => !!good) as IGood[]
        });
      }
    }
    return output;
  }

  private static _cubeIsInAnotherCube(cube: IDimension, cubeSet: IDimension[]): IDimension[] {
    return cubeSet.filter(x => this._cubeIsInCube(cube, x));
  }

  private static _cubeIsInCube(cube1: IDimension, cube2: IDimension) {
    let c1 = (cube1.xCoord + cube1.width) <= cube2.xCoord;
    let c2 = (cube2.xCoord + cube2.width) <= cube1.xCoord;
    let c3 = (cube1.yCoord + cube1.height) <= cube2.yCoord;
    let c4 = (cube2.yCoord + cube2.height) <= cube1.yCoord;
    let c5 = (cube1.zCoord + cube1.length) <= cube2.zCoord;
    let c6 = (cube2.zCoord + cube2.length) <= cube1.zCoord;
    return !c1 && !c2 && !c3 && !c4 && !c5 && !c6;
  }
}
