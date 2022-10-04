import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [ fadeInAnimation ]
})
export class AboutComponent implements OnInit {

  currentApplicationVersion = (environment as any).appVersion;

  constructor() { }

  ngOnInit(): void {
  }

}
