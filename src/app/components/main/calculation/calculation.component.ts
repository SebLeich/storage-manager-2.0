import { Component, OnInit } from '@angular/core';
import { algorithms } from 'src/app/globals';
import { CalculationService } from 'src/app/services/calculation.service';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {

  algorithms = algorithms;

  constructor(public calculationService: CalculationService) { }

  ngOnInit(): void {
  }

}
