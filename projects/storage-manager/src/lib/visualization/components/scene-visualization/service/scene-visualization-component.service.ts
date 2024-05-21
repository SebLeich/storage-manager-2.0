import { Camera, Intersection, Mesh, PerspectiveCamera, Raycaster, Scene, WebGLRenderer } from 'three';
import { Injectable, signal } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Observable, fromEvent, of, switchMap, map, startWith } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';



@Injectable()
export class SceneVisualizationComponentService {

    private _controls = signal<OrbitControls | undefined>(undefined);

    private _camera: PerspectiveCamera | undefined;
    private _renderer = new WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
    });

    private _ray = new Raycaster();

    public cameraChanged$: Observable<PerspectiveCamera | undefined> = toObservable(this._controls)
        .pipe(
            switchMap(controls => controls ? fromEvent(controls, 'change').pipe(startWith(1)) : of(undefined)),
            map(() => this._camera)
        );

    public zoomLevel = signal(1);
    public cameraPosition = signal({ x: 0, y: 0, z: 0 });

    public get camera(): PerspectiveCamera | undefined {
        return this._camera;
    }

    public get controls(): OrbitControls | undefined {
        return this._controls();
    }

    constructor(){
        this._initTextures();
    }

    public getPointedElement(event: MouseEvent, scene: Scene): null | Intersection {
        const meshes = scene.children.filter(child => child instanceof Mesh) as Mesh[];
        const x = (event.offsetX / (event.target as HTMLCanvasElement).offsetWidth) * 2 - 1;
        const y = - (event.clientY / window.innerHeight) * 2 + 1;
        this._ray.setFromCamera({ x: x, y: y }, this._camera as Camera);
        const intersects = this._ray.intersectObjects(meshes);
        let found: null | Intersection = null;
        intersects.forEach(function (object) {
            if (object.object instanceof Mesh && (found == null || found.distance > object.distance)) {
                found = object;
            }
        });

        return found;
    }

    public move(xSteps: number, ySteps: number, zSteps: number) {
        if (!this.camera || !this.controls) {
            return;
        }

        const x = this.camera.position.x + (xSteps * 500),
            y = this.camera.position.y + (ySteps * 500),
            z = this.camera.position.z + (zSteps * 500);

        this.camera.position.set(x, y, z);
        this.controls.update();
        this.cameraPosition.set(this.camera.position);
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
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
    }

    public setDefaultCameraPosition(): void {
        this._camera?.position.set(4300, 215, 3000);
        this._controls()?.update();
    }

    public setScreenDimensions(height: number, width: number) {
        this.setUpCamera(height, width);
        this._renderer.setSize(width, height);
        this.updateOrbitControls();
        return this._renderer.domElement;
    }

    public setUpCamera(height: number, width: number) {
        if (!this._camera) {
            this._camera = new PerspectiveCamera(20, width / height, 1, 10000000);
            this.setDefaultCameraPosition();
        }

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
    }

    public updateOrbitControls() {
        if (!this._camera) {
            return;
        }

        const controls = new OrbitControls(this._camera, this._renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 5000;
        controls.maxDistance = 50000;
        controls.rotateSpeed = .5;
        controls.enableZoom = true;
        controls.update();

        this._controls.set(controls);
    }

    public zoomIn() {
        if (!this.camera || !this.controls) {
            return;
        }

        const factor = 0.95;
        const x = this.camera.position.x * factor,
            y = this.camera.position.y * factor,
            z = this.camera.position.z * factor;

        this.camera.position.set(x, y, z);
        this.camera.updateProjectionMatrix();
    }

    public zoomOut() {
        if (!this.camera || !this.controls) {
            return;
        }

        const factor = 1.05;
        const x = this.camera.position.x * factor,
            y = this.camera.position.y * factor,
            z = this.camera.position.z * factor;

        this.camera.position.set(x, y, z);
        this.camera.updateProjectionMatrix();
    }

    private _render(scene: Scene) {
        if (!this._camera) {
            return;
        }

        requestAnimationFrame(() => this._render(scene));
        this._renderer.render(scene, this._camera);
    }

    private _initTextures(){
    }

}
