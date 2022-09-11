import { Injectable } from '@angular/core';

import * as ThreeJS from 'three';

import { defaultGoodEdgeColor, infinityReplacement } from '../globals';

import { IPositionedElement } from '../interfaces/i-positioned.interface';
import { IPosition } from '../interfaces/i-position.interface';

@Injectable()
export class VisualizationService {

  public static getContainerBaseGrid(containerHeight: number, containerLength: number): ThreeJS.GridHelper {
    const gridHelper = new ThreeJS.GridHelper(1.5 * containerLength, 15);
    gridHelper.position.set(0, (containerHeight / -2), 0);
    return gridHelper;
  }

  public static generateFilledBoxMesh(position: IPosition, surfaceColor: string, type: string, relativeToParent?: IPosition, borderColor: string = defaultGoodEdgeColor, borderWidth: number = 1) {

    const geometry = new ThreeJS.BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length, 4, 4, 4);
    const material = new ThreeJS.MeshBasicMaterial({ color: surfaceColor });

    const mesh = new ThreeJS.Mesh(geometry, material);
    const relativePosition = this.calculateRelativePosition(position, relativeToParent);
    mesh.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
    mesh.userData = { type: type };

    const edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(mesh.geometry), new ThreeJS.LineBasicMaterial({ color: borderColor, linewidth: borderWidth }));
    edges.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
    edges.userData = { type: type, positionId: position.id };

    return { mesh, edges };
  }

  public static generateOutlinedBoxMesh(position: IPosition, type: string, relativeToParent?: IPosition, borderColor: string = defaultGoodEdgeColor, borderWidth: number = 1) {

    const geometry = new ThreeJS.BoxGeometry(position.width, position.height, position.length === Infinity ? infinityReplacement : position.length);
    const edges = new ThreeJS.LineSegments(new ThreeJS.EdgesGeometry(geometry), new ThreeJS.LineBasicMaterial({ color: borderColor, linewidth: borderWidth }));
    const relativePosition = this.calculateRelativePosition(position, relativeToParent);
    edges.position.set(relativePosition.xCoord, relativePosition.yCoord, relativePosition.zCoord);
    edges.userData = { type: type, positionId: position.id };

    return { edges };
  }

  public static calculateRelativePosition(position: IPosition, relativeToParent?: IPosition): IPositionedElement {
    return {
      xCoord: relativeToParent ? position.xCoord! - (relativeToParent.width! / 2) + (position.width! / 2) : position.xCoord,
      yCoord: relativeToParent ? position.yCoord! - (relativeToParent.height! / 2) + (position.height! / 2) : position.yCoord,
      zCoord: relativeToParent ? position.zCoord! - (relativeToParent.length! / 2) + ((position.length === Infinity ? infinityReplacement : position.length!) / 2) : position.zCoord
    }
  }

}
