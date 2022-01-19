import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
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

}