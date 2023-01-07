import { Component, VERSION } from '@angular/core';
import { environment } from 'src/environments/environment';
import { fadeInAnimation } from 'src/lib/shared/animations/fade-in.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [fadeInAnimation],
})
export class AboutComponent {
  public currentApplicationVersion = (environment as any).appVersion;
  public angularVersion = VERSION.full;
}
