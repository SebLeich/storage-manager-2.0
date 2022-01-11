import { HttpClient } from "@angular/common/http";
import { ElementRef, Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Solution } from "src/app/classes";
import * as ThreeJS from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable()
export class VizualizerComponentService {

    scene = new ThreeJS.Scene();
    renderer = new ThreeJS.WebGLRenderer({ antialias: true });
    camera: ThreeJS.PerspectiveCamera = null;
    controls: OrbitControls = null;

    private _resized = new Subject<void>();
    resized$ = this._resized.pipe(debounceTime(300));

    defaultSolution: Solution = null;

    private _subscriptions: Subscription[] = [];

    constructor(private _httpClient: HttpClient) {
        this._setUp();
    }

    dispose() {
        for (let sub of this._subscriptions) sub.unsubscribe();
        this._subscriptions = [];
    }

    render() {
        requestAnimationFrame(() => {
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        });
    }

    setBody(ref: ElementRef<HTMLDivElement>) {
        this.setSceneDimensions(ref.nativeElement.clientWidth, ref.nativeElement.clientHeight);
        ref.nativeElement.append(this.renderer.domElement);
    }

    setSceneDimensions(width: number, height: number) {
        this.camera = new ThreeJS.PerspectiveCamera(45, width / height, 1, 10000000);
        this.camera.position.set(12000, 5000, 10000);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        this.controls.dampingFactor = 0.25;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 100;
        this.controls.maxDistance = 100000;
        this.controls.keys = {
            LEFT: '37', //left arrow
            UP: '38', // up arrow
            RIGHT: '39', // right arrow
            BOTTOM: '40' // down arrow
        };
        this.controls.rotateSpeed = 0.1;
        this.render();
    }

    triggerResizeEvent = () => this._resized.next();

    private _setUp() {
        this.scene.background = new ThreeJS.Color('rgb(255,255,200)');
        this.renderer.domElement.id = "solution-preview";
        this._httpClient.get('/assets/defaultSolution.json').subscribe((solution: Solution) => {
            this.defaultSolution = solution;
        });
    }

}   