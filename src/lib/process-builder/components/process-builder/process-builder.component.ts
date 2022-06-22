import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { showAnimation } from 'src/lib/shared/animations/show';
import { ProcessBuilderService } from '../../services/process-builder.service';
import { ProcessBuilderComponentService } from './process-builder-component.service';

@Component({
  selector: 'app-process-builder',
  templateUrl: './process-builder.component.html',
  styleUrls: ['./process-builder.component.sass'],
  animations: [
    showAnimation
  ],
  providers: [
    ProcessBuilderComponentService
  ]
})
export class ProcessBuilderComponent implements AfterContentInit, OnDestroy, OnInit {

  @ViewChild('diagramWrapper', { static: true }) private diagramWrapper!: ElementRef<HTMLDivElement>;

  constructor(
    public processBuilderService: ProcessBuilderService,
    public processBuilderComponentService: ProcessBuilderComponentService
  ) { }

  clearState(){
    localStorage.removeItem('params');
    localStorage.removeItem('funcs');
    localStorage.removeItem('models');
    location.reload();
  }

  ngAfterContentInit(): void {
    this.processBuilderComponentService.init(this.diagramWrapper.nativeElement);
  }

  ngOnDestroy(): void {
    this.processBuilderComponentService.dispose();
  }

  ngOnInit(): void {
    
  }

}
