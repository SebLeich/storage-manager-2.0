import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private _limitedHeight = new BehaviorSubject<boolean>(false);
  limitedHeight$ = this._limitedHeight.asObservable();

  constructor(
    public router: Router,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.validateClient();
  }

  validateClient(){
    this._limitedHeight.next(window.innerHeight <= 500);
  }

}
