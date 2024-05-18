import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IPosition, IPositionedElement, ISolution, ISpace } from '@smgr/interfaces';
import { defaultGoodEdgeColor, infinityReplacement } from 'src/app/globals';
import getContainerPositionSharedMethods from 'src/app/methods/get-container-position.shared-methods';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { selectGroups } from '@smgr/store';
import { ArrowHelper, BoxGeometry, Color, EdgesGeometry, GridHelper, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, Scene, Vector3 } from 'three';
import { Solution } from '@/lib/storage-manager/types/solution.type';

@Injectable()
export class VisualizationService {

    static _helperArrowLength = 500;

    constructor(private _store: Store) { }

    public static calculateRelativePosition(position: IPositionedElement & ISpace, parent?: IPositionedElement & ISpace): IPositionedElement {
        return {
            xCoord: parent ? position.xCoord - (parent.width / 2) + (position.width / 2) : position.xCoord,
            yCoord: parent ? position.yCoord - (parent.height / 2) + (position.height / 2) : position.yCoord,
            zCoord: parent ? position.zCoord - (parent.length / 2) + ((position.length === Infinity ? infinityReplacement : position.length) / 2) : position.zCoord
        }
    }

    public async configureSolutionScene(solution: ISolution | Solution, scene: Scene = new Scene(), fillColor: boolean | string = false, addBaseGrid = true, addUnloadingArrow = true) {
        scene.clear();
        const goodMeshes: { goodId: string, mesh: Mesh }[] = [];
        if (solution?.container) {
            if (fillColor) {
                scene.background = new Color(typeof fillColor === 'string' ? fillColor : 'rgb(255,255,255)');
            }
            const containerPosition = getContainerPositionSharedMethods(solution.container);
            const containerResult = VisualizationService.generateOutlinedBoxMesh(containerPosition, 'container');
            scene.add(containerResult.edges);
            const groups = await selectSnapshot(this._store.select(selectGroups));
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

    public static generateOutlinedBoxMesh(position: IPosition, type: string, relativeToParent?: IPosition, borderColor: string = defaultGoodEdgeColor, borderWidth = 1) {
        const geometry = new BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length);
        const edges = new LineSegments(new EdgesGeometry(geometry), new LineBasicMaterial({ color: borderColor, linewidth: borderWidth }));
        const relativePosition = this.calculateRelativePosition(position, relativeToParent);
        edges.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
        edges.userData = { type: type, positionId: position.id };

        return { edges };
    }

}
