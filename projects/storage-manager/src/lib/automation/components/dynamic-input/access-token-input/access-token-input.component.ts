import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FORM_GROUP } from 'src/lib/automation/interfaces';

@Component({
  selector: 'app-access-token-input',
  templateUrl: './access-token-input.component.html',
  styleUrls: ['./access-token-input.component.css']
})
export class AccessTokenInputComponent implements OnInit {

  constructor(@Inject(FORM_GROUP) public formGroup: UntypedFormGroup) { }

  ngOnInit(): void {
  }

}
