import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { Container, Good, Solution } from '../classes';
import { generateGuid } from '../globals';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private _dataService: DataService) { }

  allInOneRow() {
    combineLatest([this._dataService.orders$, this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.groups$])
      .pipe(take(1))
      .subscribe(([orders, height, width, groups]) => {
        let solution = new Solution(generateGuid(), 'Super Flo');
        solution._Container = new Container(height, width, 0);
        let currentPosition = { x: 0, y: 0, z: 0 };
        let sequenceNumber = 0;
        for(let order of orders){
          let good = new Good(currentPosition.x, currentPosition.y, currentPosition.z, sequenceNumber, order.description);
          good.setOrderDimensions(order);
          solution._Container._Goods.push(good);
          sequenceNumber++;
          currentPosition.z += order.length;
          solution._Container._Length += order.length;
        }
        solution._Groups = groups;
        console.log(solution);
        this._dataService.setCurrentSolution(solution);
      });
  }
}
