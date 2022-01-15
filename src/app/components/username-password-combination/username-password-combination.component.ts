import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FORM_GROUP } from 'src/app/interfaces';

@Component({
  selector: 'app-username-password-combination',
  templateUrl: './username-password-combination.component.html',
  styleUrls: ['./username-password-combination.component.css']
})
export class UsernamePasswordCombinationComponent implements OnInit {

  showPassword: boolean = false;

  constructor(@Inject(FORM_GROUP) public formGroup: FormGroup) { }

  ngOnInit(): void {
  }

}
