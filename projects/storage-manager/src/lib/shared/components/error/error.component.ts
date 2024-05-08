import { Component, OnInit } from '@angular/core';
import { showAnimation } from '../../animations/show';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  animations: [ showAnimation ]
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
