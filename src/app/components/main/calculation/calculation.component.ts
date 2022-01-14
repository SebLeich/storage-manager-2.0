import { Component, OnInit } from '@angular/core';
import { showAnimation } from 'src/app/animations';
import { ALGORITHM_CALCULATION_STATUS } from './calculation-component.classes';
import { CalculationComponentService } from './calculation-component.service';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css'],
  providers: [
    CalculationComponentService
  ],
  animations: [ showAnimation ]
})
export class CalculationComponent implements OnInit {

  ALGORITHM_CALCULATION_STATUS = ALGORITHM_CALCULATION_STATUS;

  constructor(public calculationComponentService: CalculationComponentService) { }

  ngOnInit(): void {
  }

}
