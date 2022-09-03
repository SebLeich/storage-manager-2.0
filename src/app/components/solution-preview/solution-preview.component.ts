import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { showAnimation } from 'src/app/animations';
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
export class SolutionPreviewComponent {

  public headline$ = this.dataService.currentSolution$.pipe(map(solution => solution.description));
  public algorithm$ = this.dataService.currentSolution$.pipe(map(solution => solution.algorithm));
  public calculated$ = this.dataService.currentSolution$.pipe(map(solution => solution.calculated));
  public container$ = this.dataService.currentSolution$.pipe(map(solution => solution.container));

  constructor(
    public solutionPreviewComponentService: SolutionPreviewComponentService,
    public dataService: DataService
  ) { }

  downloadSolution = () => this.dataService.downloadCurrentSolution();

}
