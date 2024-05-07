import { IParam } from '../process-builder/interfaces/param.interface';
import { ProcessBuilderRepository } from './process-builder-repository';

import solutionTypeDef from './test/solution-type-def.test-data.json';
import solutionObject from './test/solution-object.test-data.json';

describe('Test Process Builder Repository', () => {

    it('should extract correct pseudo object', () => {
        const pseudoObject = ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(solutionTypeDef as any);
        expect(pseudoObject).toEqual(solutionObject);
    });

    it('should extract correct type definition', () => {
        const extractedTypeDef = ProcessBuilderRepository.extractObjectTypeDefinition(solutionObject);
        expect(extractedTypeDef).toEqual(solutionTypeDef as any);
    });

    describe('transitive object / type def transformation', () => {

        let pseudoObject: object = solutionObject;
        for (let index = 0; index < 10; index++) {

            const displayIndex = index + 1;
            it(`should provide correct result in iteration ${displayIndex}`, () => {

                const extractedTypeDef = ProcessBuilderRepository.extractObjectTypeDefinition(pseudoObject);
                expect(extractedTypeDef).toEqual(solutionTypeDef as any);

                pseudoObject = ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(extractedTypeDef as IParam) as object;
                expect(pseudoObject).toEqual(solutionObject as any);

            });

        }

    });


});