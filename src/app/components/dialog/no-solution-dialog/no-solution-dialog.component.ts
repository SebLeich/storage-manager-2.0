import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VisualizerComponentService } from '../../main/visualizer/visualizer-component-service';

@Component({
  selector: 'app-no-solution-dialog',
  templateUrl: './no-solution-dialog.component.html',
  styleUrls: ['./no-solution-dialog.component.css']
})
export class NoSolutionDialogComponent implements OnInit {

  constructor(
    private _ref: MatDialogRef<NoSolutionDialogComponent>,
    private _router: Router,
    private _visualizerComponentService: VisualizerComponentService
  ) { }

  close = () => this._ref.close();

  gotoOrders(){
    this._ref.close();
    this._router.navigate(['/orders']);
  }

  ngOnInit(): void {
  }

  useExampleData(){
    this.close();
    
  }

  useExampleSolution(){
    this.close();
    this._visualizerComponentService.loadDefaultSolution();
  }

}
