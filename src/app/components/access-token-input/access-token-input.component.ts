import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_GROUP } from 'src/app/interfaces';

@Component({
  selector: 'app-access-token-input',
  templateUrl: './access-token-input.component.html',
  styleUrls: ['./access-token-input.component.css']
})
export class AccessTokenInputComponent implements OnInit {

  constructor(@Inject(FORM_GROUP) public formGroup: FormGroup) { }

  ngOnInit(): void {
  }

}
