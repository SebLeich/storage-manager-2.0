import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { showAnimation } from 'src/app/animations';
import { Solution } from 'src/app/classes';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-solution-preview',
  templateUrl: './solution-preview.component.html',
  styleUrls: ['./solution-preview.component.css'],
  animations: [ showAnimation ]
})
export class SolutionPreviewComponent implements OnDestroy, OnInit {

  headline: string = null;
  calculated: string = null;
  algorithm: string = null;

  private _subscriptions: Subscription[] = [];

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit(): void {
    this._subscriptions.push(...[
      this._dataService.currentSolution$.pipe(filter(x => x ? true : false)).subscribe((solution: Solution) => {
        this.headline = solution._Description;
        this.calculated = solution._Calculated;
        this.algorithm = solution._Algorithm;
      })
    ]);
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

}
