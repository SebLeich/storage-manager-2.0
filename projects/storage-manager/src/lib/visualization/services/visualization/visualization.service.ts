import { Injectable } from '@angular/core';
import { IPosition } from '@smgr/interfaces';
import { defaultGoodEdgeColor, infinityReplacement } from 'src/app/globals';
import getContainerPositionSharedMethods from 'src/app/methods/get-container-position.shared-methods';
import { ArrowHelper, BoxGeometry, CanvasTexture, Color, DoubleSide, EdgesGeometry, GridHelper, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, PlaneGeometry, Scene, Texture, TextureLoader, Vector3 } from 'three';
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
        fillColor: boolean | string = false,
        addBaseGrid = true,
        addUnloadingArrow = true,
        labelPositions: ObjectSite[] = ['right'],
        wallPositions: ObjectSite[] = ['bottom'],
        wallTexture: WallTexture = 'yellow'
    ) {
        scene.clear();

        const goodMeshes: { goodId: string, mesh: Mesh }[] = [];
        if (solution?.container) {
            if (fillColor) {
                scene.background = new Color(typeof fillColor === 'string' ? fillColor : 'rgb(255,255,255)');
            }

            const containerPosition = getContainerPositionSharedMethods(solution.container),
                { edges } = VisualizationService.generateOutlinedBoxMesh(containerPosition, 'container');

            scene.add(edges);

            for (const good of solution.container.goods) {
                const position = getContainerPositionSharedMethods(good);
                const group = groups.find((group) => group.id === good.group),
                    goodResult = VisualizationService.generateFilledBoxMesh(position, 'good', containerPosition);

                goodResult.mesh.userData['goodId'] = good.id;
                goodResult.mesh.userData['groupId'] = good.group;
                goodMeshes.push({ goodId: good.id, mesh: goodResult.mesh });
                scene.add(goodResult.edges, goodResult.mesh);

                const relativePosition = VisualizationService.calculateRelativePosition(position, containerPosition);
                const labels = VisualizationService.getGoodLabels(good, relativePosition, group, labelPositions);
                labels.length > 0 && scene.add(...labels);
            }

            if (addBaseGrid) {
                scene.add(VisualizationService.getContainerBaseGrid(solution.container.height, solution.container.length));
            }

            if (addUnloadingArrow) {
                scene.add(VisualizationService.getContainerUnloadingArrow(solution.container.length, solution.container.height));
            }
            
            const map = new TextureLoader().load(`assets/textures/container_${wallTexture}.jpg`);
            const walls = VisualizationService.getContainerWalls(containerPosition, map, wallPositions);
            walls.length > 0 && scene.add(...walls);
        }

        return { scene, goodMeshes };
    }

    public async configureSolutionStepScene(
        scene: Scene = new Scene(),
        container: Container,
        groups: Group[],
        steps: CalculationStep[] = [],
        stepIndex: number = 0,
        fillColor: boolean | string = false,
        addBaseGrid = true,
        addUnloadingArrow = true,
        labelPositions: ObjectSite[] = ['right'],
        wallPositions: ObjectSite[] = ['bottom'],
        wallTexture: WallTexture = 'yellow'
    ) {
        scene.clear();

        if (fillColor) {
            scene.background = new Color(typeof fillColor === 'string' ? fillColor : 'rgb(255,255,255)');
        }

        const containerPosition = ThreeDCalculationService.calculateSpatialPosition(container),
            containerResult = VisualizationService.generateOutlinedBoxMesh({ ...containerPosition, id: 'CT' }, 'container');

        scene.add(containerResult.edges);

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

        for (const position of lastUsedPositions) {
            const spatial = ThreeDCalculationService.calculateSpatialPosition(position),
                label = position.goodDesc,
                group = groups.find(group => group.id === position.groupId);

            const { edges, mesh } = VisualizationService.generateFilledBoxMesh({ ...spatial, id: `${position.goodId}` }, 'good', containerPosition);

            scene.add(edges, mesh);

            const relativePosition = VisualizationService.calculateRelativePosition(position, containerPosition);
            const labels = VisualizationService.getGoodLabels({ ...spatial, desc: label }, relativePosition, group, labelPositions);
            labels.length > 0 && scene.add(...labels);
        }

        if (addBaseGrid) {
            scene.add(VisualizationService.getContainerBaseGrid(container.height, container.length));
        }

        if (addUnloadingArrow) {
            scene.add(VisualizationService.getContainerUnloadingArrow(container.length, container.height));
        }

        const map = new TextureLoader().load(`assets/textures/container_${wallTexture}.jpg`);
        const walls = VisualizationService.getContainerWalls(containerPosition, map, wallPositions);
        walls.length > 0 && scene.add(...walls);

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

    public static generateFilledBoxMesh(
        position: IPosition | SpatialPositioned & Identifiable,
        type: string,
        relativeToParent?: IPosition | SpatialPositioned,
        borderColor: string = defaultGoodEdgeColor,
        borderWidth = 1
    ) {
        const geometry = new BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length, 4, 4, 4),
            texture = new TextureLoader().load('assets/textures/cardboard.jpg');

        const material = new MeshBasicMaterial({ map: texture });
        const mesh = new Mesh(geometry, material);
        const relativePosition = this.calculateRelativePosition(position, relativeToParent);
        mesh.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
        mesh.userData = { type: type };

        const edges = new LineSegments(new EdgesGeometry(mesh.geometry), new LineBasicMaterial({ color: borderColor, linewidth: borderWidth }));
        edges.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
        edges.userData = { type: type, positionId: position.id };

        return { mesh, edges };
    }

    public static generateOutlinedBoxMesh(
        position: IPosition | SpatialPositioned & Identifiable,
        type: 'container' | 'position',
        relativeToParent?: IPosition | SpatialPositioned,
        borderColor: string = defaultGoodEdgeColor,
        borderWidth: number = 1
    ) {
        const geometry = new BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length);
        const edges = new LineSegments(new EdgesGeometry(geometry), new LineBasicMaterial({ color: borderColor, linewidth: borderWidth }));
        const relativePosition = this.calculateRelativePosition(position, relativeToParent);
        edges.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
        edges.userData = { type, positionId: position.id };

        return { edges };
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
        const material = new MeshBasicMaterial({ map: texture, transparent: true });

        const geometry = new PlaneGeometry(canvas.width, canvas.height);
        const mesh = new Mesh(geometry, material);
        return mesh;
    }

}
