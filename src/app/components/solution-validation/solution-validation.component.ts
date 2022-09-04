import { Component, OnInit } from '@angular/core';
import { SOLUTION_ERROR } from 'src/app/globals';
import { IGood } from 'src/app/interfaces/i-good.interface';
import { DataService } from 'src/app/services/data.service';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

@Component({
  selector: 'app-solution-validation',
  templateUrl: './solution-validation.component.html',
  styleUrls: ['./solution-validation.component.css']
})
export class SolutionValidationComponent implements OnInit {

  constructor(
    public dataService: DataService,
    private _visualizerComponentService: VisualizerComponentService
  ) { }

  hoverError(error: { error: SOLUTION_ERROR, effectedGoods: IGood[] }){
    if(Array.isArray(error.effectedGoods)) this._visualizerComponentService.highlightGoods(error.effectedGoods);
  }

  mouseleave = () => this._visualizerComponentService.reRenderCurrentContainer();

  ngOnInit(): void {
  }

}
