import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Good, Group } from "src/app/classes";
import { IGoodsProvider, IGroupsProvider } from "src/app/interfaces";
import { DataService } from "src/app/services/data.service";

@Injectable()
export class SolutionPreviewComponentService implements IGroupsProvider, IGoodsProvider {

    constructor(
        private _dataService: DataService
    ){ }

    groups$: Observable<Group[]> = this._dataService.currentSolution$.pipe(map(x => x._Groups));
    goods$: Observable<Good[]> = this._dataService.currentSolution$.pipe(map(x => x._Container._Goods));

}