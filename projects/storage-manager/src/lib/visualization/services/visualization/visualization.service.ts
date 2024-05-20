import { Injectable } from '@angular/core';
import { IPosition, IPositionedElement, ISpace } from '@smgr/interfaces';
import { defaultGoodEdgeColor, infinityReplacement } from 'src/app/globals';
import getContainerPositionSharedMethods from 'src/app/methods/get-container-position.shared-methods';
import { ArrowHelper, BoxGeometry, Color, EdgesGeometry, GridHelper, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, Scene, Vector3 } from 'three';
import { Solution } from '@/lib/storage-manager/types/solution.type';
import { Group } from '@/lib/storage-manager/types/group.type';
import { CalculationStep } from '@/lib/storage-manager/types/calculation-step.type';
import { UsedPosition } from '@/lib/storage-manager/types/used-position.type';
import { SpatialPositioned } from '@/lib/storage-manager/types/spatial-positioned.type';
import { Identifiable } from '@/lib/storage-manager/types/identifiable.type';
import { ThreeDCalculationService } from '@/lib/shared/services/three-d-calculation.service';
import { Container } from '@/lib/storage-manager/types/container.type';

@Injectable()
export class VisualizationService {

    static _helperArrowLength = 500;

    public static calculateRelativePosition(position: IPositionedElement & ISpace, parent?: IPositionedElement & ISpace): IPositionedElement {
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
        addUnloadingArrow = true
    ) {
        scene.clear();

        const goodMeshes: { goodId: string, mesh: Mesh }[] = [];
        if (solution?.container) {
            if (fillColor) {
                scene.background = new Color(typeof fillColor === 'string' ? fillColor : 'rgb(255,255,255)');
            }

            const containerPosition = getContainerPositionSharedMethods(solution.container),
                containerResult = VisualizationService.generateOutlinedBoxMesh(containerPosition, 'container');

            scene.add(containerResult.edges);

            for (const good of solution.container.goods) {
                const group = groups.find((group) => group.id === good.group);
                const goodResult = VisualizationService.generateFilledBoxMesh(getContainerPositionSharedMethods(good), group?.color ?? '#ffffff', 'good', containerPosition);
                goodResult.mesh.userData['goodId'] = good.id;
                goodResult.mesh.userData['groupId'] = good.group;
                goodMeshes.push({ goodId: good.id, mesh: goodResult.mesh });
                scene.add(goodResult.edges, goodResult.mesh);
            }

            if (addBaseGrid) {
                scene.add(VisualizationService.getContainerBaseGrid(solution.container.height, solution.container.length));
            }

            if (addUnloadingArrow) {
                scene.add(VisualizationService.getContainerUnloadingArrow(solution.container.length));
            }

        }

        return { scene, goodMeshes };
    }

    public async configureSolutionStepScene(
        scene: Scene = new Scene(),
        container: Container,
        steps: CalculationStep[] = [],
        stepIndex: number = 0,
        fillColor: boolean | string = false,
        addBaseGrid = true,
        addUnloadingArrow = true
    ) {
        scene.clear();

        if (fillColor) {
            scene.background = new Color(typeof fillColor === 'string' ? fillColor : 'rgb(255,255,255)');
        }

        const containerPosition = ThreeDCalculationService.calculateSpatialPosition(container),
            containerResult = VisualizationService.generateOutlinedBoxMesh({ ...containerPosition, id: 'CT' }, 'container');

        scene.add(containerResult.edges);

        const appliedSteps = steps.slice(0, stepIndex + 1),
            goodMeshes: { goodId: string, mesh: Mesh }[] = [];

        const usedPositions: UsedPosition[] = appliedSteps
            .flatMap(step => step.positions)
            .filter(position => Array.isArray((position as UsedPosition).usedPositions)) as UsedPosition[];

        const usedPositionIndices = usedPositions.flatMap(position => position.usedPositions);
        const unusedPositions = appliedSteps
            .flatMap(step => step.positions)
            .filter(position => !usedPositionIndices.includes(position.index));

        for (const position of unusedPositions) {
            const spatial = ThreeDCalculationService.calculateSpatialPosition(position);
            const { edges } = VisualizationService.generateOutlinedBoxMesh({ ...spatial, id: `UUP_${position.index}` }, 'position', containerPosition);

            scene.add(edges);
        }

        if (addBaseGrid) {
            scene.add(VisualizationService.getContainerBaseGrid(container.height, container.length));
        }

        if (addUnloadingArrow) {
            scene.add(VisualizationService.getContainerUnloadingArrow(container.length));
        }

        return { scene, goodMeshes };
    }

    public static getContainerUnloadingArrow(containerLength: number, arrowColor = "#e33268") {
        const from = new Vector3(0, 0, (containerLength / 2)),
            to = new Vector3(0, 0, (containerLength / 2) + this._helperArrowLength);

        const direction = to.clone().sub(from);
        const length = direction.length();
        const arrowHelper = new ArrowHelper(direction.normalize(), from, length, arrowColor, (.2 * length), ((.2 * length) * .5));

        return arrowHelper;
    }

    public static getContainerBaseGrid(containerHeight: number, containerLength: number): GridHelper {
        const gridHelper = new GridHelper(1.5 * containerLength, 15);
        gridHelper.position.set(0, (containerHeight / -2), 0);

        return gridHelper;
    }

    public static generateFilledBoxMesh(position: IPosition, surfaceColor: string, type: string, relativeToParent?: IPosition, borderColor: string = defaultGoodEdgeColor, borderWidth = 1) {
        const geometry = new BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length, 4, 4, 4);
        const material = new MeshBasicMaterial({ color: surfaceColor });
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

}
