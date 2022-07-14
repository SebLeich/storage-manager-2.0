import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { showAnimation } from 'src/app/animations';
import { Container, Solution } from 'src/app/classes';
import { GOODS_PROVIDER, GROUPS_PROVIDER } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { SolutionPreviewComponentService } from './solution-preview-component.service';

@Component({
  selector: 'app-solution-preview',
  templateUrl: './solution-preview.component.html',
  styleUrls: ['./solution-preview.component.css'],
  providers: [
    SolutionPreviewComponentService,
    { provide: GOODS_PROVIDER, useExisting: SolutionPreviewComponentService },
    { provide: GROUPS_PROVIDER, useExisting: SolutionPreviewComponentService }
  ],
  animations: [showAnimation]
})
export class SolutionPreviewComponent implements OnDestroy, OnInit {

  headline: string = null;
  calculated: string = null;
  algorithm: string = null;
  container: Container = null;

  private _subscriptions: Subscription[] = [];

  constructor(
    public solutionPreviewComponentService: SolutionPreviewComponentService,
    public dataService: DataService
  ) { }

  downloadSolution = () => this.dataService.downloadCurrentSolution();

  ngOnInit(): void {
    this._subscriptions.push(...[
      this.dataService.currentSolution$.pipe(filter(x => x ? true : false)).subscribe((solution: Solution) => {
        this.headline = solution.description;
        this.calculated = solution.calculated;
        this.algorithm = solution.algorithm;
        this.container = solution.container;
      })
    ]);
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

}
