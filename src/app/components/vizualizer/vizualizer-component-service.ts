import { HttpClient } from "@angular/common/http";
import { ElementRef, Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { Container, Dimension, Group, Solution } from "src/app/classes";
import { DataService } from "src/app/data.service";
import * as ThreeJS from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable()
export class VizualizerComponentService {

    scene = new ThreeJS.Scene();
    renderer = new ThreeJS.WebGLRenderer({ antialias: false });
    camera: ThreeJS.PerspectiveCamera = null;
    controls: OrbitControls = null;
    gridHelper: ThreeJS.GridHelper = null;

    private _resized = new Subject<void>();
    resized$ = this._resized.pipe(debounceTime(300));

    defaultSolution: Solution = null;

    private _meshes: { groupColor: string, groupId: number, seqNr: number, goodId: number, mesh: ThreeJS.Mesh }[] = [];
    private _subscriptions: Subscription[] = [];

    constructor(private _httpClient: HttpClient) {
        this._setUp();
    }

    dispose() {
        for (let sub of this._subscriptions) sub.unsubscribe();
        this._subscriptions = [];
    }

    render() {
        requestAnimationFrame(() => this.render());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    addContainerToScene(container: Container) {
        while (this.scene.children.length > 0) this.scene.remove(this.scene.children[0]);
        var from = new ThreeJS.Vector3(0, (container._Height / -2), (container._Length / 2));
        var to = new ThreeJS.Vector3(0, (container._Height / -2), (container._Length / 2) + 1000);
        var direction = to.clone().sub(from);
        var length = direction.length();
        var arrowHelper = new ThreeJS.ArrowHelper(direction.normalize(), from, length, "red");
        this.scene.add(arrowHelper);
        var gridHelper = new ThreeJS.GridHelper(1.5 * container._Length, 15);
        gridHelper.position.set(0, (container._Height / -2), 0);
        this.scene.add(gridHelper);
        this._addElementToScene(DataService.getContainerDimension(container), 'bordered', null, null, null, null)
        /*
        super.draw(null, { type: "bordered" });
        for (var index in this.goods) {
            var g = this.goods[index];
            g.draw({ h: this.height, w: this.width, l: this.length }, { type: "filled" });
        }
        */
    }

    setBody(ref: ElementRef<HTMLDivElement>) {
        this.setSceneDimensions(ref.nativeElement.clientWidth, ref.nativeElement.clientHeight);
        ref.nativeElement.append(this.renderer.domElement);
    }

    setSceneDimensions(width: number, height: number) {
        this.camera = new ThreeJS.PerspectiveCamera(20, width / height, 1, 10000000);
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
        this.controls.rotateSpeed = 1;
        let ray = new ThreeJS.Raycaster();
        this.controls.update();
        window.requestAnimationFrame(() => this.render());
    }

    triggerResizeEvent = () => this._resized.next();

    private _addElementToScene(dimension: Dimension, type: null | 'bordered' | 'filled', sequenceNumber: number = null, goodId: number = null, group: Group = null, parentDimension: Dimension = null) {

        var length = dimension.length;
        if (!length) length = (parentDimension.length - dimension.z); // rotation

        var mesh: ThreeJS.Mesh;
        var edges: ThreeJS.LineSegments;

        switch (type) {

            case "filled":
                var color = group && group._Color ? group._Color : "rgb(200, 200, 200)";
                var groupId = group && group._Id ? group._Id : null;

                var geometry = new ThreeJS.BoxGeometry(dimension.width, dimension.height, length, 4, 4, 4);  // rotation
                var material = new ThreeJS.MeshBasicMaterial({ color: color });
                mesh = new ThreeJS.Mesh(geometry, material);

                var meshWrapper = {
                    groupColor: color,
                    groupId: groupId,
                    seqNr: sequenceNumber,
                    goodId: goodId,
                    mesh: mesh
                };
                this._meshes.push(meshWrapper);

                edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(meshWrapper.mesh.geometry), new ThreeJS.LineBasicMaterial({ color: 0x333333, linewidth: 1 }));
                meshWrapper.mesh.add(edges);
                break;

            default:
                var geometry = new ThreeJS.BoxBufferGeometry(dimension.width, dimension.height, dimension.length);
                edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(geometry), new ThreeJS.LineBasicMaterial({ color: 0x333333, linewidth: 1}));
                break;
        }
        var x = parentDimension ? dimension.x - (parentDimension.width / 2) + (dimension.width / 2) : dimension.x;
        var y = parentDimension ? dimension.y - (parentDimension.height / 2) + (dimension.height / 2) : dimension.y;
        var z = parentDimension ? dimension.z - (parentDimension.length / 2) + (dimension.length / 2) : dimension.z;
        if (mesh) {
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.position.z = z;
            this.scene.add(mesh);
        }
        if (edges != null) {
            edges.position.set(x, y, z);
            this.scene.add(edges);
        }
    }

    private _setUp() {
        this.scene.background = new ThreeJS.Color('rgb(238,238,238)');
        this.renderer.domElement.id = "solution-preview";
        this._httpClient.get('/assets/defaultSolution.json').subscribe((solution: Solution) => {
            this.defaultSolution = solution;
            this.addContainerToScene(solution._Container);
        });
    }

}   