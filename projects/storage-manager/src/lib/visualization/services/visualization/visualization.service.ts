import { Injectable } from '@angular/core';
import { IPosition } from '@smgr/interfaces';
import { defaultGoodEdgeColor, infinityReplacement } from 'src/app/globals';
import { AmbientLight, ArrowHelper, BoxGeometry, CanvasTexture, Color, DirectionalLight, DoubleSide, EdgesGeometry, GridHelper, LineBasicMaterial, LineSegments, Matrix4, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, Scene, Texture, TextureLoader, Vector3 } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { Solution } from '@/lib/storage-manager/types/solution.type';
import { Group } from '@/lib/storage-manager/types/group.type';
import { CalculationStep } from '@/lib/storage-manager/types/calculation-step.type';
import { UsedPosition } from '@/lib/storage-manager/types/used-position.type';
import { SpatialPositioned } from '@/lib/storage-manager/types/spatial-positioned.type';
import { Identifiable } from '@/lib/storage-manager/types/identifiable.type';
import { ThreeDCalculationService } from '@/lib/shared/services/three-d-calculation.service';
import { Container } from '@/lib/storage-manager/types/container.type';
import { Spatial } from '@/lib/storage-manager/types/spatial.type';
import { Positioned } from '@/lib/storage-manager/types/positioned.type';
import { ObjectSite } from '@/lib/storage-manager/types/object-site.type';
import { WallTexture } from '@/lib/storage-manager/types/wall-texture.type';
import { CSG } from 'three-csg-ts';
import { v4 } from 'uuid';
import { GoodTexture } from '@/lib/storage-manager/types/good-texture.type';

@Injectable()
export class VisualizationService {

    static _helperArrowLength = 500;
    static _glitchMargin = 5;

    public static calculateRelativePosition(position: Positioned & Spatial, parent?: Spatial): Positioned {
        return {
            xCoord: parent ? position.xCoord - (parent.width / 2) + (position.width / 2) : position.xCoord,
            yCoord: parent ? position.yCoord - (parent.height / 2) + (position.height / 2) : position.yCoord,
            zCoord: parent ? position.zCoord - (parent.length / 2) + ((position.length === Infinity ? infinityReplacement : position.length) / 2) : position.zCoord
        }
    }

    public async configureSolutionScene(
        solution: Solution,
        scene: Scene = new Scene(),
        groups: Group[],
        addLights = true,
        fillColor: boolean | string = false,
        addBaseGrid = true,
        displayContainer = true,
        addUnloadingArrow = true,
        labelPositions: ObjectSite[] = ['right'],
        wallPositions: ObjectSite[] = ['bottom'],
        wallTexture: WallTexture = 'yellow',
        displayContainerEdges = true,
        displayGoods = true,
        displayGoodEdges = true,
        displayEmptySpace = false,
        displayEmptySpaceEdges = false,
        fillEmptySpace = false
    ) {
        scene.clear();

        addLights && scene.add(...Object.values(VisualizationService.getLights()));

        const goodMeshes: { goodId: string, mesh: Mesh }[] = [];
        if (solution?.container) {
            if (fillColor) {
                scene.background = new Color(typeof fillColor === 'string' ? fillColor : 'rgb(255,255,255)');
            }

            const containerPosition = ThreeDCalculationService.spatialPositionedToUnusedPosition(ThreeDCalculationService.calculateSpatialPosition(solution.container)),
                goodCSGs: CSG[] = [];

            for (const good of solution.container.goods) {
                const position = ThreeDCalculationService.calculateSpatialPosition(good);
                const group = groups.find((group) => group.id === good.group),
                    { basicMesh, mesh, edges } = VisualizationService.generateFilledBoxMesh({ ...position, id: v4() }, 'good', containerPosition, undefined, undefined, good.texture);

                if (displayGoods) {
                    mesh.userData['goodId'] = good.id;
                    mesh.userData['groupId'] = good.group;
                    goodMeshes.push({ goodId: good.id, mesh });
                    scene.add(mesh);
                    if (displayGoodEdges) {
                        scene.add(edges);
                    }

                    const relativePosition = VisualizationService.calculateRelativePosition(position, containerPosition);
                    const labels = VisualizationService.getGoodLabels(good, relativePosition, group, labelPositions);
                    labels.length > 0 && scene.add(...labels);
                }

                basicMesh.updateMatrixWorld();
                goodCSGs.push(CSG.fromMesh(basicMesh));
            }

            if (addBaseGrid) {
                scene.add(VisualizationService.getContainerBaseGrid(solution.container.height, solution.container.length));
            }

            if (addUnloadingArrow) {
                scene.add(VisualizationService.getContainerUnloadingArrow(solution.container.length, solution.container.height));
            }

            let containerCSG: CSG | undefined = undefined,
                containerMatrix: Matrix4 | undefined = undefined;

            if (displayContainer) {
                const { edges, mesh } = VisualizationService.generateOutlinedBoxMesh({ ...containerPosition, id: 'CT' }, 'container');
                displayContainerEdges && scene.add(edges);

                containerCSG = CSG.fromMesh(mesh);
                containerMatrix = edges.matrix;

                const map = new TextureLoader().load(`assets/textures/container_${wallTexture}.jpg`);
                const walls = VisualizationService.getContainerWalls(containerPosition, map, wallPositions);
                walls.length > 0 && scene.add(...walls);
            }

            if (displayEmptySpace && containerCSG && containerMatrix) {
                goodCSGs.forEach(goodCSG => containerCSG = containerCSG?.subtract(goodCSG));

                const unusedSpaceMeshMaterial = new MeshStandardMaterial({
                    color: 0x0000ff,
                    transparent: true,
                    opacity: 0.5,
                    side: DoubleSide
                });
                const unusedSpaceMesh = CSG.toMesh(containerCSG, containerMatrix, unusedSpaceMeshMaterial);
                fillEmptySpace && scene.add(unusedSpaceMesh);

                if (displayEmptySpaceEdges) {
                    const edgesGeometry = new EdgesGeometry(unusedSpaceMesh.geometry);
                    const edgesMaterial = new LineBasicMaterial({ color: 0xffffff });
                    const edgesMesh = new LineSegments(edgesGeometry, edgesMaterial);
                    scene.add(edgesMesh);
                }
            }
        }

        return { scene, goodMeshes };
    }

    public async configureSolutionStepScene(
        scene: Scene = new Scene(),
        container: Container,
        groups: Group[],
        addLights = true,
        steps: CalculationStep[] = [],
        stepIndex: number = 0,
        fillColor: boolean | string = false,
        addBaseGrid = true,
        displayContainer = true,
        addUnloadingArrow = true,
        labelPositions: ObjectSite[] = ['right'],
        wallPositions: ObjectSite[] = ['bottom'],
        wallTexture: WallTexture = 'yellow',
        displayContainerEdges = true,
        displayGoods = true,
        displayGoodEdges = true,
        displayEmptySpace = false,
        displayEmptySpaceEdges = false,
        fillEmptySpace = false
    ) {
        scene.clear();

        addLights && scene.add(...Object.values(VisualizationService.getLights()));

        if (fillColor) {
            scene.background = new Color(typeof fillColor === 'string' ? fillColor : 'rgb(255,255,255)');
        }

        const containerPosition = ThreeDCalculationService.calculateSpatialPosition(container);
        const appliedSteps = steps.slice(0, stepIndex),
            lastStep = steps[stepIndex],
            goodMeshes: { goodId: string, mesh: Mesh }[] = [];

        const usedPositions: UsedPosition[] = appliedSteps
            .flatMap(step => step.positions)
            .filter(position => Array.isArray((position as UsedPosition).usedPositions)) as UsedPosition[],
            lastUsedPositions: UsedPosition[] = lastStep
                .positions
                .filter(position => Array.isArray((position as UsedPosition).usedPositions)) as UsedPosition[];

        const usedPositionIndices = usedPositions.flatMap(position => position.usedPositions),
            lastUsedPositionIndices = lastUsedPositions.flatMap(position => position.usedPositions);

        const unusedPositions = appliedSteps
            .flatMap(step => step.positions)
            .filter(position => !usedPositionIndices.includes(position.index) && !lastUsedPositionIndices.includes(position.index));

        for (const position of unusedPositions) {
            const spatial = ThreeDCalculationService.calculateSpatialPosition(position);
            const { edges } = VisualizationService.generateOutlinedBoxMesh({ ...spatial, id: `UUP_${position.index}` }, 'position', containerPosition);

            scene.add(edges);
        }

        let goodCSGs: CSG[] = [];
        if (displayGoods) {
            for (const position of lastUsedPositions) {
                const spatial = ThreeDCalculationService.calculateSpatialPosition(position),
                    label = position.goodDesc,
                    group = groups.find(group => group.id === position.groupId);

                const { edges, mesh } = VisualizationService.generateFilledBoxMesh({ ...spatial, id: `${position.goodId}` }, 'good', containerPosition);
                scene.add(mesh);
                if (displayGoodEdges) {
                    scene.add(edges);
                }

                goodCSGs.push(CSG.fromGeometry(edges.geometry));

                const relativePosition = VisualizationService.calculateRelativePosition(position, containerPosition);
                const labels = VisualizationService.getGoodLabels({ ...spatial, desc: label }, relativePosition, group, labelPositions);
                labels.length > 0 && scene.add(...labels);
            }
        }

        if (addBaseGrid) {
            scene.add(VisualizationService.getContainerBaseGrid(container.height, container.length));
        }

        if (addUnloadingArrow) {
            scene.add(VisualizationService.getContainerUnloadingArrow(container.length, container.height));
        }

        let containerCSG: CSG | undefined = undefined,
            containerMatrix: any;

        if (displayContainer) {
            if (displayContainerEdges) {
                const { edges, mesh } = VisualizationService.generateOutlinedBoxMesh({ ...containerPosition, id: 'CT' }, 'container');
                scene.add(edges);

                containerCSG = CSG.fromMesh(mesh),
                    containerMatrix = edges.matrix;
            }

            const map = new TextureLoader().load(`assets/textures/container_${wallTexture}.jpg`);
            const walls = VisualizationService.getContainerWalls(containerPosition, map, wallPositions);
            walls.length > 0 && scene.add(...walls);
        }

        if (containerCSG) {
            goodCSGs.forEach(goodCSG => containerCSG = containerCSG?.subtract(goodCSG));

            const unusedSpaceMesh = CSG.toMesh(containerCSG, containerMatrix);
            scene.add(unusedSpaceMesh);
        }

        return { scene, goodMeshes };
    }

    public static getContainerUnloadingArrow(containerLength: number, containerHeight: number, arrowColor = '#e33268') {
        const from = new Vector3(0, (containerHeight / -2), (containerLength / 2)),
            to = new Vector3(0, (containerHeight / -2), (containerLength / 2) + this._helperArrowLength);

        const direction = to.clone().sub(from);
        const length = direction.length();
        const arrowHelper = new ArrowHelper(direction.normalize(), from, length, arrowColor, (.2 * length), ((.2 * length) * .5));

        return arrowHelper;
    }

    public static getContainerBaseGrid(containerHeight: number, containerLength: number, color = '#cccccc'): GridHelper {
        const gridHelper = new GridHelper(1.5 * containerLength, 15, undefined, color);
        gridHelper.position.set(0, (containerHeight / -2) - (3 * this._glitchMargin), 0);

        return gridHelper;
    }

    public static getGoodLabels(good: Spatial & { desc: string | null }, { xCoord, yCoord, zCoord }: Positioned, group?: Group, positions: ObjectSite[] = []): Mesh[] {
        const labels: Mesh[] = [];

        if (positions.indexOf('right') > -1) {
            const label = VisualizationService.createLabel(`${good.desc}`, `${group?.desc}`, group?.color ?? 'white');
            label.position.set(xCoord + (good.width / 2) + this._glitchMargin, yCoord, zCoord);
            label.rotateY(Math.PI / 2);
            labels.push(label);
        }

        if (positions.indexOf('left') > -1) {
            const label = VisualizationService.createLabel(`${good.desc}`, `${group?.desc}`, group?.color ?? 'white');
            label.position.set(xCoord - (good.width / 2) - this._glitchMargin, yCoord, zCoord);
            label.rotateY(Math.PI / -2);
            labels.push(label);
        }

        if (positions.indexOf('front') > -1) {
            const label = VisualizationService.createLabel(`${good.desc}`, `${group?.desc}`, group?.color ?? 'white');
            label.position.set(xCoord, yCoord, zCoord + (good.length / 2) + this._glitchMargin);
            labels.push(label);
        }

        if (positions.indexOf('rear') > -1) {
            const label = VisualizationService.createLabel(`${good.desc}`, `${group?.desc}`, group?.color ?? 'white');
            label.position.set(xCoord, yCoord, zCoord - (good.length / 2) - this._glitchMargin);
            label.rotateY(Math.PI);
            labels.push(label);
        }

        if (positions.indexOf('bottom') > -1) {
            const label = VisualizationService.createLabel(`${good.desc}`, `${group?.desc}`, group?.color ?? 'white');
            label.position.set(xCoord, yCoord - (good.height / 2) - this._glitchMargin, zCoord);
            label.rotateX(Math.PI / 2);
            labels.push(label);
        }

        if (positions.indexOf('top') > -1) {
            const label = VisualizationService.createLabel(`${good.desc}`, `${group?.desc}`, group?.color ?? 'white');
            label.position.set(xCoord, yCoord + (good.height / 2) + this._glitchMargin, zCoord);
            label.rotateX(Math.PI / -2);
            labels.push(label);
        }

        return labels;
    }

    public static getContainerWalls(container: Spatial, map: Texture, positions: ObjectSite[] = []): Mesh[] {
        const walls: Mesh[] = [];

        if (positions.indexOf('bottom') > -1) {

            const bottomWall = new Mesh(new PlaneGeometry(container.width + (this._glitchMargin * 4), container.length + (this._glitchMargin * 4)), new MeshBasicMaterial({ map, side: DoubleSide })),
                relativePosition = this.calculateRelativePosition({ ...container, height: 0, xCoord: 0, yCoord: 0, zCoord: 0 }, container);

            bottomWall.position.set(relativePosition.xCoord, relativePosition.yCoord - (this._glitchMargin * 2), relativePosition.zCoord);
            bottomWall.rotateX(Math.PI / 2);
            walls.push(bottomWall);
        }

        if (positions.indexOf('rear') > -1) {
            const rearWall = new Mesh(new PlaneGeometry(container.width + (this._glitchMargin * 4), container.height + (this._glitchMargin * 4)), new MeshBasicMaterial({ map, side: DoubleSide })),
                relativePosition = this.calculateRelativePosition({ ...container, length: 0, xCoord: 0, yCoord: 0, zCoord: 0 }, container);

            rearWall.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord - (this._glitchMargin * 2));
            walls.push(rearWall);
        }

        if (positions.indexOf('left') > -1) {
            const leftWall = new Mesh(new PlaneGeometry(container.length + (this._glitchMargin * 4), container.height + (this._glitchMargin * 4)), new MeshBasicMaterial({ map, side: DoubleSide })),
                relativePosition = this.calculateRelativePosition({ ...container, width: 0, xCoord: 0, yCoord: 0, zCoord: 0 }, container);

            leftWall.position.set(relativePosition.xCoord - (this._glitchMargin * 2), relativePosition.yCoord, relativePosition.zCoord);
            leftWall.rotateY(Math.PI / 2);
            walls.push(leftWall);
        }

        if (positions.indexOf('front') > -1) {
            const frontWall = new Mesh(new PlaneGeometry(container.width + (this._glitchMargin * 4), container.height + (this._glitchMargin * 4)), new MeshBasicMaterial({ map, side: DoubleSide })),
                relativePosition = this.calculateRelativePosition({ ...container, length: 0, xCoord: 0, yCoord: 0, zCoord: container.length }, container);

            frontWall.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord + (this._glitchMargin * 2));
            walls.push(frontWall);
        }

        if (positions.indexOf('right') > -1) {
            const rightWall = new Mesh(new PlaneGeometry(container.length + (this._glitchMargin * 4), container.height + (this._glitchMargin * 4)), new MeshBasicMaterial({ map, side: DoubleSide })),
                relativePosition = this.calculateRelativePosition({ ...container, width: 0, xCoord: container.width, yCoord: 0, zCoord: 0 }, container);

            rightWall.position.set(relativePosition.xCoord + (this._glitchMargin * 2), relativePosition.yCoord, relativePosition.zCoord);
            rightWall.rotateY(Math.PI / 2);
            walls.push(rightWall);
        }

        if (positions.indexOf('top') > -1) {
            const topWall = new Mesh(new PlaneGeometry(container.width + (this._glitchMargin * 4), container.length + (this._glitchMargin * 4)), new MeshBasicMaterial({ map, side: DoubleSide })),
                relativePosition = this.calculateRelativePosition({ ...container, height: 0, xCoord: 0, yCoord: container.height, zCoord: 0 }, container);

            topWall.position.set(relativePosition.xCoord, relativePosition.yCoord + (this._glitchMargin * 2), relativePosition.zCoord);
            topWall.rotateX(Math.PI / 2);
            walls.push(topWall);
        }

        return walls;
    }

    public static getLights(): { ambientLight: AmbientLight, directionalLight: DirectionalLight } {
        const ambientLight = new AmbientLight(0x404040);

        const directionalLight = new DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;

        return { ambientLight, directionalLight };
    }

    public static generateFilledBoxMesh(
        position: IPosition | SpatialPositioned & Identifiable,
        type: string,
        relativeToParent?: IPosition | SpatialPositioned,
        borderColor: string = defaultGoodEdgeColor,
        borderWidth = 1,
        goodTexture: GoodTexture = 'cardboard'
    ) {
        const geometry = new RoundedBoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length, 4, 10),
            texture = new TextureLoader().load(`assets/textures/${goodTexture}.jpg`);

        const material = new MeshBasicMaterial({ map: texture });
        if(goodTexture === 'glass'){
            material.transparent = true;
            material.opacity = 0.5;
        }

        const mesh = new Mesh(geometry, material);
        const relativePosition = this.calculateRelativePosition(position, relativeToParent);
        mesh.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
        mesh.userData = { type: type };

        const edges = new LineSegments(new EdgesGeometry(mesh.geometry), new LineBasicMaterial({ color: borderColor, linewidth: borderWidth }));
        edges.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
        edges.userData = { type: type, positionId: position.id };

        const basicMesh = new Mesh(new BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length), new MeshBasicMaterial({ transparent: true, opacity: 0 }));
        basicMesh.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
        return { basicMesh, mesh, edges };
    }

    public static generateOutlinedBoxMesh(
        position: IPosition | SpatialPositioned & Identifiable,
        type: 'container' | 'position',
        relativeToParent?: IPosition | SpatialPositioned,
        borderColor: string = defaultGoodEdgeColor,
        borderWidth: number = 1
    ) {
        const boxGeometry = new BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length);
        const edges = new LineSegments(new EdgesGeometry(boxGeometry), new LineBasicMaterial({ color: borderColor, linewidth: borderWidth }));
        const relativePosition = this.calculateRelativePosition(position, relativeToParent);
        edges.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
        edges.userData = { type, positionId: position.id };

        const material = new MeshBasicMaterial({ transparent: false, opacity: 1 });
        const mesh = new Mesh(boxGeometry, material);

        return { boxGeometry, edges, mesh };
    }

    public static createLabel(text: string, subTitle = '', groupColor = 'white'): Mesh {
        const canvas = document.createElement('canvas'),
            context = canvas.getContext('2d');

        if (!context) {
            return new Mesh();
        }

        canvas.width = 200;
        canvas.height = 90;

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = groupColor;
        context.beginPath();
        context.arc(canvas.width - 30, 30, 20, 0, Math.PI * 2, false);
        context.fill();

        context.font = '28px Arial';
        context.fillStyle = 'black';
        context.fillText(text, 6, canvas.height - 50);

        context.font = '20px Arial';
        context.fillText(subTitle, 6, canvas.height - 20);

        const texture = new CanvasTexture(canvas);
        const material = new MeshBasicMaterial({ map: texture, transparent: true, side: DoubleSide });

        const geometry = new PlaneGeometry(canvas.width, canvas.height);
        const mesh = new Mesh(geometry, material);
        return mesh;
    }

}
