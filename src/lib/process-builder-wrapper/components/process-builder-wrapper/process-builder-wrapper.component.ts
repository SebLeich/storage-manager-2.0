import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProcessBuilderComponentService } from 'src/lib/process-builder/components/process-builder/process-builder-component.service';
import { ProcessBuilderComponent } from 'src/lib/process-builder/components/process-builder/process-builder.component';
import { showListAnimation } from 'src/lib/shared/animations/show-list';

@Component({
  selector: 'app-process-builder-wrapper',
  templateUrl: './process-builder-wrapper.component.html',
  styleUrls: ['./process-builder-wrapper.component.sass'],
  animations: [
    showListAnimation
  ]
})
export class ProcessBuilderWrapperComponent implements OnInit {

  @ViewChild(ProcessBuilderComponent) processBuilderComponent!: ProcessBuilderComponent;

  private _modelsVisible = new BehaviorSubject<boolean>(true);
  private _methodsVisible = new BehaviorSubject<boolean>(false);
  private _paramsVisible = new BehaviorSubject<boolean>(false);

  modelsVisible$ = this._modelsVisible.asObservable();
  methodsVisible$ = this._methodsVisible.asObservable();
  paramsVisible$ = this._paramsVisible.asObservable();

  constructor(
    public service: ProcessBuilderComponentService
  ) { }

  blurElement(element: HTMLElement, event?: Event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    element.blur();
  }

  ngOnInit(): void {
  }

  toggleModules() {
    this._modelsVisible.pipe(take(1)).subscribe((val: boolean) => this._modelsVisible.next(!val));
  }

  toggleMethods() {
    this._methodsVisible.pipe(take(1)).subscribe((val: boolean) => this._methodsVisible.next(!val));
  }

  toggleParams() {
    this._paramsVisible.pipe(take(1)).subscribe((val: boolean) => this._paramsVisible.next(!val));
  }

}
