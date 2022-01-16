import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_GROUP } from 'src/lib/automation/interfaces';

@Component({
  selector: 'app-endpoint-input',
  templateUrl: './endpoint-input.component.html',
  styleUrls: ['./endpoint-input.component.css']
})
export class EndpointInputComponent implements OnInit {

  constructor(@Inject(FORM_GROUP) public formGroup: FormGroup) { }

  ngOnInit(): void {
  }

}
