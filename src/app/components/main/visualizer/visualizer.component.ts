import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { showAnimation } from 'src/app/animations';
import { Dimension, Solution } from 'src/app/classes';
import { selectedGoodEdgeColor } from 'src/app/globals';
import { DataService } from 'src/app/services/data.service';
import { NoSolutionDialogComponent } from '../../dialog/no-solution-dialog/no-solution-dialog.component';
import { VisualizerComponentService } from './visualizer-component-service';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Object3D, PerspectiveCamera } from 'three';
import { SmartpackingIoService } from 'src/app/services/smartpacking-io.service';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
  providers: [VisualizerComponentService],
  animations: [showAnimation],
})
export class VisualizerComponent implements AfterViewInit, OnDestroy, OnInit {
  private _menuVisible = new BehaviorSubject<boolean>(true);
  menuVisible$ = this._menuVisible.asObservable();

  private _displayDetails = new BehaviorSubject<boolean>(true);
  displayDetails$ = this._displayDetails.asObservable();

  @ViewChild('visualizerWrapper', { static: false }) set visualizerWrapperRef(
    ref: ElementRef<HTMLDivElement>
  ) {
    this.visualizerComponentService.setVisualizerWrapper(ref);
  }

  private _subscriptions: Subscription[] = [];

  constructor(
    public visualizerComponentService: VisualizerComponentService,
    private _dataService: DataService,
    private _dialog: MatDialog,
    private _viewContainerRef: ViewContainerRef,
    private _smartpackingIoService: SmartpackingIoService
  ) { }

  load() {

    this.visualizerComponentService.clearScene();

    combineLatest([
      this._smartpackingIoService.getPreview('jeans'),
      this._smartpackingIoService.getPreview('shirt')
    ]).subscribe(([jeans, shirt]: Object3D[]) => {
      let shirt1: Object3D = shirt.clone(), shirt2: Object3D = shirt.clone(), shirt3: Object3D = shirt.clone(), jeans1: Object3D = jeans.clone(), jeans2: Object3D = jeans.clone();
      this.visualizerComponentService.scene.add(shirt1, shirt2, shirt3, jeans1, jeans2);
      shirt2.position.set(0, 0.025, 0);
      shirt3.position.set(0, 0.05, 0);
      jeans1.position.set(-0.2, 0.01, 0.25);
      jeans1.rotateY(270 * (Math.PI/180));
      jeans2.position.set(-0.2, 0.04, 0.25);
      jeans2.rotateY(270 * (Math.PI/180));
      this.visualizerComponentService.addBoxToScene({ x: 0, y: 0, z: 0, width: 0.5, length: 0.6, height: 0.3 } as Dimension);
      this.visualizerComponentService.camera = new PerspectiveCamera(20, 200 / 100, 0, 100);
      this.visualizerComponentService.camera.fov = 20;
      this.visualizerComponentService.camera.aspect = 2;
      this.visualizerComponentService.camera.near = 1;
      this.visualizerComponentService.camera.zoom = .5;
      this.visualizerComponentService.addLight();
      this.visualizerComponentService.camera.updateProjectionMatrix();
      this.visualizerComponentService.camera.position.set(0, 0, 5);
      this.visualizerComponentService.initControls();
      this.visualizerComponentService.addBaseGridToScene(1, 1, 0, 0, 0);
      this.visualizerComponentService.render();
    });

  }

  ngAfterViewInit(): void {
    this.validateClient();
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
    this.visualizerComponentService.dispose();
  }

  ngOnInit(): void {
    this._subscriptions.push(
      ...[
        this.visualizerComponentService.resized$
          .pipe(
            switchMap(() =>
              this.visualizerComponentService.visualizerWrapper$.pipe(take(1))
            )
          )
          .subscribe((ref: ElementRef<HTMLDivElement>) => {
            this.visualizerComponentService.setSceneDimensions(
              ref.nativeElement.clientWidth,
              ref.nativeElement.clientHeight,
              true
            );
          }),
        this._dataService.currentSolution$
          .pipe(
            filter((solution: Solution) => (solution === null ? true : false))
          )
          .subscribe(() => this.showNoSolutionDialog()),
        this.menuVisible$.subscribe(() =>
          this.visualizerComponentService.triggerResizeEvent()
        ),
      ]
    );
  }

  showNoSolutionDialog() {
    this._dialog.open(NoSolutionDialogComponent, {
      panelClass: 'no-padding-dialog',
      disableClose: true,
      viewContainerRef: this._viewContainerRef,
    });
  }

  toggleMenu = () => this._menuVisible.next(!this._menuVisible.value);

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.visualizerComponentService.triggerResizeEvent();
    this.validateClient();
  }

  @HostListener('document:keypress', ['$event'])
  onKeydown = (event) => this.visualizerComponentService.keydown(event);

  selectedGoodEdgeColor = selectedGoodEdgeColor;

  validateClient() {
    this._displayDetails.next(window.innerWidth >= 1000);
    this._menuVisible.next(window.innerWidth >= 1000);
  }
}
