import { Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-param-member-path-preview',
  templateUrl: './param-member-path-preview.component.html',
  styleUrls: ['./param-member-path-preview.component.css']
})
export class ParamMemberPathPreviewComponent {

  @Input() set path(path: string | null | undefined){
    if(typeof path === 'undefined'){
      return;
    }

    this._pathSegments.next(this.toPathSegments(path));
  }

  private _pathSegments = new ReplaySubject<string[]>(1);

  public pathSegments$ = this._pathSegments.asObservable();
  public segmentCount$ = this.pathSegments$.pipe(map(x => x.length));

  constructor() { }

  toPathSegments(value: null | string): string[] {
    return typeof value === 'string'? value.split('.'): [];
  }

}
