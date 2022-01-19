import { Injectable } from "@angular/core";
import { combineLatest, Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";
import { Good, Group } from "src/app/classes";
import { IGoodsProvider, IGroupsProvider } from "src/app/interfaces";
import { DataService } from "src/app/services/data.service";

@Injectable()
export class SolutionPreviewComponentService implements IGroupsProvider, IGoodsProvider {

    constructor(
        public dataService: DataService
    ){ }

    groups$: Observable<Group[]> = this.dataService.currentSolution$.pipe(filter(x => x? true: false), map(x => x._Groups));
    goods$: Observable<Good[]> = this.dataService.currentSolution$.pipe(filter(x => x? true: false), map(x => x._Container._Goods));

    nextSolution(){
        combineLatest([this.dataService.solutions$, this.dataService.currentSolution$]).pipe(take(1)).subscribe({
            next: ([solutions, currentSolution]) => {
                let index = solutions.indexOf(currentSolution);
                index = index === solutions.length - 1? 0: index + 1;
                this.dataService.setCurrentSolution(solutions[index]);
            }
        })
    }

}