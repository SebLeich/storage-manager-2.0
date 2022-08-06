import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Object3D } from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root'
})
export class SmartpackingIoService {

  private _loader = new GLTFLoader();
  private _modelDictionary = {};

  constructor() { }

  getPreview(item: 'shirt' | 'jeans'): Observable<Object3D> {
    if (!this._modelDictionary[item]) {
      let pathMapping = {
        'jeans': './assets/3d-models/jeans.glb',
        'shirt': './assets/3d-models/shirt.glb'
      };
      const subject = new ReplaySubject<Object3D>(1);
      this._loader[item] = subject.asObservable();
      this._loader.load(
        pathMapping[item],
        (object: GLTF) => {
          subject.next(object.scene);
        },
        (event: ProgressEvent) => {
          console.log(`loading ${item}: ${(event.loaded/event.total) * 100} %`);
        },
        (error) => {
          subject.error(error);
        }
      );
      this._modelDictionary[item] = subject.asObservable();
    }
    return this._modelDictionary[item];
  }
}
