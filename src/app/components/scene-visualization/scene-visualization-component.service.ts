import * as ThreeJS from 'three';

import { Injectable } from '@angular/core';

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
  private _ray: ThreeJS.Raycaster = new ThreeJS.Raycaster();

  public getPointedElement(event: MouseEvent, scene: ThreeJS.Scene): null | ThreeJS.Intersection {
    const meshes = scene.children.filter(child => child instanceof ThreeJS.Mesh) as ThreeJS.Mesh[];
    const x = (event.offsetX / (event.target as HTMLCanvasElement).offsetWidth) * 2 - 1;
    const y = - (event.clientY / window.innerHeight) * 2 + 1;
    this._ray.setFromCamera({ x: x, y: y }, this._camera!);
    const intersects = this._ray.intersectObjects(meshes);
    var found: null | ThreeJS.Intersection = null;
    intersects.forEach(function (object) {
      if (object.object instanceof ThreeJS.Mesh && (found == null || found.distance > object.distance)) {
        found = object;
      }
    });

    return found;
  }

  public renderScene(scene: Scene) {
    if (!this._camera) {
      throw ('cannot render scene: camera not initialized!');
    }
    if (!this._controls) {
      throw ('cannot render scene: orbit controls not initialized!');
    }
    this._render(scene);
  }

  public updateSize(height: number, width: number) {
    if (!this._camera) {
      throw ('cannot update renderer: camera not initialized!');
    }
    this._renderer.setSize(width, height);
    this._camera!.aspect = width / height;
    this._camera!.updateProjectionMatrix();
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
    this._controls.rotateSpeed = .5;
    this._controls.update();
  }

  private _render(scene: Scene) {
    requestAnimationFrame(() => this._render(scene));
    this._renderer.render(scene, this._camera!);
  }

}
