import { VisualizationService } from './visualization.service';
import { ArrowHelper, GridHelper } from 'three';
import { IPositionedElement, ISpace } from '@/lib/storage-manager/interfaces';
import { infinityReplacement } from '@/app/globals';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import defaultImportsConstant from '@/app/default-imports.constant';

describe('SolutionVisualizationService', () => {
    const containerLength = 500,
        containerWidth = 1000,
        containerHeight = 1000;

    let spectator: SpectatorService<VisualizationService>;

    const createService = createServiceFactory({
        imports: [
            ...defaultImportsConstant
        ],
        service: VisualizationService,
    });

    beforeEach(() => spectator = createService());

    it('should be created', () => {
        expect(spectator.service).toBeTruthy();
    });

    it('should create correct grid helper', () => {
        const gridHelper = VisualizationService.getContainerBaseGrid(containerWidth, containerLength);

        expect(gridHelper instanceof GridHelper).toBeTruthy();
        expect(gridHelper.position.x).toBe(0);
        expect(gridHelper.position.y).toBe((containerWidth / -2)  - (3 * VisualizationService._glitchMargin));
        expect(gridHelper.position.z).toBe(0);
    });

    it('should create unloading arrow', () => {
        const unloadingArrow = VisualizationService.getContainerUnloadingArrow(containerLength, containerHeight);

        expect(unloadingArrow instanceof ArrowHelper).toBeTruthy();
    });

    const testSet = [
        { position: { height: 100, length: 100, width: 100, xCoord: 1, yCoord: 0, zCoord: 1 } as IPositionedElement & ISpace, parent: undefined as undefined | (IPositionedElement & ISpace), expected: { xCoord: 1, yCoord: 0, zCoord: 1 } as IPositionedElement },
        { position: { height: 100, length: 200, width: 100, xCoord: 1, yCoord: 0, zCoord: 1 } as IPositionedElement & ISpace, parent: { height: 1000, length: 1000, width: 1000, xCoord: 0, yCoord: 0, zCoord: 0 } as undefined | (IPositionedElement & ISpace), expected: { xCoord: -449, yCoord: -450, zCoord: -399 } as IPositionedElement },
        { position: { height: 100, length: Infinity, width: 100, xCoord: 1, yCoord: 0, zCoord: 1 } as IPositionedElement & ISpace, parent: { height: 1000, length: 1000, width: 1000, xCoord: 0, yCoord: 0, zCoord: 0 } as undefined | (IPositionedElement & ISpace), expected: { xCoord: -449, yCoord: -500 + (infinityReplacement / 2), zCoord: -449 } as IPositionedElement }
    ];
    testSet.forEach(({ position, parent, expected }) => {
        it(`expect relative position for pos(x: ${position.xCoord}, y: ${position.yCoord}, z: ${position.zCoord} | h: ${position.height}, w: ${position.width}, l: ${position.length}) and par(x: ${parent?.xCoord}, y: ${parent?.yCoord}, z: ${parent?.zCoord} | h: ${parent?.height}, w: ${parent?.width}, l: ${parent?.length}) to be rpos(x: ${expected.xCoord}, y: ${expected.yCoord}, z: ${expected.zCoord})`, () => {
            const relativePosition = VisualizationService.calculateRelativePosition(position, parent);
            expect(relativePosition).toEqual(expected);
        });
    });
});
