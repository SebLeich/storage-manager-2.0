import { Injectable } from '@angular/core';
import { IPosition } from '@smgr/interfaces';
import { SolutionValidationErrorWrapper } from '@/lib/shared/types/solution-validation-error-wrapper.type';
import { SolutionValidationError } from '@/lib/shared/enums/solution-validation-error.enum';
import getContainerPositionSharedMethods from '@/app/methods/get-container-position.shared-methods';
import { Solution } from '@/lib/storage-manager/types/solution.type';

@Injectable()
export class ValidationService {

    public static validateSolution(solution: Solution): SolutionValidationErrorWrapper[] {
        if (solution === null) {
            return [{ error: SolutionValidationError.NoSolution }];
        }

        if (!solution.container) {
            return [{ error: SolutionValidationError.NoContainer }];
        }

        const output = [],
            goodsXError1 = solution.container.goods.filter(({ xCoord }) => xCoord < 0),
            goodsXError2 = solution.container.goods.filter(({ xCoord, width }) => (xCoord + width) > solution.container.width),
            goodsYError1 = solution.container.goods.filter(({ yCoord }) => yCoord < 0),
            dimensions = solution.container.goods.map((good) => ({ good, dimension: getContainerPositionSharedMethods(good) })),
            goodsYError2 = solution.container.goods.filter(x => (x.yCoord + x.height) > solution.container!.height),
            goodsZError1 = solution.container.goods.filter(x => x.zCoord < 0),
            goodsZError2 = solution.container.goods.filter((good) => (good.zCoord + good.length) > solution.container!.length);

        for(let error of goodsXError1) output.push({ error: SolutionValidationError.GoodBeforeContainerXCoord, args: { good: error.desc, id: error.id } });
        for(let error of goodsXError2) output.push({ error: SolutionValidationError.GoodOutOfContainerXCoord, args: { good: error.desc, id: error.id } });
        for(let error of goodsYError1) output.push({ error: SolutionValidationError.GoodBeforeContainerYCoord, args: { good: error.desc, id: error.id } });
        for(let error of goodsYError2) output.push({ error: SolutionValidationError.GoodOutOfContainerYCoord, args: { good: error.desc, id: error.id } });
        for(let error of goodsZError1) output.push({ error: SolutionValidationError.GoodBeforeContainerZCoord, args: { good: error.desc, id: error.id } });
        for(let error of goodsZError2) output.push({ error: SolutionValidationError.GoodOutOfContainerZCoord, args: { good: error.desc, id: error.id } });

        const pastOverlapping: string[] = [];
        for (let wrapper of dimensions) {
            const overlappingSet = this._cubeIsInAnotherCube(wrapper.dimension, Object.values(dimensions).map(x => x.dimension).filter(x => wrapper.dimension !== x));
            if (overlappingSet.length > 0) {
                const overlapingWith = (overlappingSet.map(x => (dimensions.find(y => y.dimension === x))?.good));
                const overlapingWithIds = [wrapper.good.id, ...overlapingWith.map(x => x?.id)].sort().join('-');
                if (pastOverlapping.includes(overlapingWithIds)) {
                    continue;
                }
                pastOverlapping.push(overlapingWithIds);
                output.push({
                    error: SolutionValidationError.GoodOverlap,
                    args: {
                        good: wrapper.good.desc,
                        id: wrapper.good.id,
                        overlapingWith: (overlapingWith.map(x => x?.desc).filter(x => !!x) as string[]).join(', ')
                    }
                });
            }
        }

        const goodsLongerThanContainer = solution.container.goods.filter(good => good.length > solution.container!.length),
            goodsWiderThanContainer = solution.container.goods.filter(good => good.width > solution.container!.width),
            goodsHigherThanContainer = solution.container.goods.filter(good => good.height > solution.container!.height);

        for(let error of goodsLongerThanContainer) output.push({ error: SolutionValidationError.GoodLongerThanContainer, args: { good: error.desc, id: error.id } });
        for(let error of goodsWiderThanContainer) output.push({ error: SolutionValidationError.GoodWiderThanContainer, args: { good: error.desc, id: error.id } });
        for(let error of goodsHigherThanContainer) output.push({ error: SolutionValidationError.GoodHigherThanContainer, args: { good: error.desc, id: error.id } });
        
        return output;
    }

    private static _cubeIsInAnotherCube(cube: IPosition, cubeSet: IPosition[]): IPosition[] {
        return cubeSet.filter(x => this._cubeIsInCube(cube, x));
    }

    private static _cubeIsInCube(cube1: IPosition, cube2: IPosition) {
        let c1 = (cube1.xCoord + cube1.width) <= cube2.xCoord;
        let c2 = (cube2.xCoord + cube2.width) <= cube1.xCoord;
        let c3 = (cube1.yCoord + cube1.height) <= cube2.yCoord;
        let c4 = (cube2.yCoord + cube2.height) <= cube1.yCoord;
        let c5 = (cube1.zCoord + cube1.length) <= cube2.zCoord;
        let c6 = (cube2.zCoord + cube2.length) <= cube1.zCoord;
        return !c1 && !c2 && !c3 && !c4 && !c5 && !c6;
    }
}
