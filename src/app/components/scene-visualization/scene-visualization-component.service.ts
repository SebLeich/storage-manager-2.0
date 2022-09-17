import * as ThreeJS from 'three';

import { Injectable, OnDestroy } from '@angular/core';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Scene } from 'three';

@Injectable()
export class SceneVisualizationComponentService {

  private _camera: ThreeJS.PerspectiveCamera | undefined;
  private _controls: OrbitControls | undefined;
  private _renderer = new ThreeJS.WebGLRenderer({
    antialias: true,
    preserveDrawingBuffer: true
  });

  constructor() { }

  public renderScene(scene: Scene) {
    if (!this._camera) {
      throw ('cannot render scene: no camera initialized!');
    }
    if (!this._controls) {
      throw ('cannot render scene: no orbit controls initialized!');
    }
    this._render(scene);
  }

  public setScreenDimensions(height: number, width: number) {
    this.setUpCamera(height, width);
    this._renderer.setSize(width, height);
    this.updateOrbitControls();
    return this._renderer.domElement;
  }

  public setUpCamera(height: number, width: number) {
    if (!this._camera) {
      this._camera = new ThreeJS.PerspectiveCamera(20, width / height, 1, 10000000);
      this._camera.position.set(12000, 5000, 10000);
    }
    this._camera.aspect = width / height;
    this._camera.updateProjectionMatrix();
  }

  public updateOrbitControls() {
    this._controls = new OrbitControls(this._camera!, this._renderer.domElement);
    this._controls.enableDamping = true;
    this._controls.dampingFactor = 0.25;
    this._controls.screenSpacePanning = false;
    this._controls.minDistance = 5000;
    this._controls.maxDistance = 50000;
    this._controls.rotateSpeed = 1;
    this._controls.update();
  }

  private _render(scene: Scene) {
    requestAnimationFrame(() => this._render(scene));
    this._renderer.render(scene, this._camera!);
  }

}
