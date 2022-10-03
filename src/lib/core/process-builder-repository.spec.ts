import { isEqual } from 'lodash';
import { IParam } from '../process-builder/globals/i-param';
import { ProcessBuilderRepository } from './process-builder-repository';

import solutionTypeDef from './test/solution-type-def.test-data.json';
import solutionObject from './test/solution-object.test-data.json';

describe('Test Process Builder Repository', () => {

    it('should extract correct pseudo object', () => {
        const pseudoObject = ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(solutionTypeDef as IParam);
        expect(isEqual(pseudoObject, solutionObject)).toBeTrue();
    });

    it('should extract correct type definition', () => {
        const extractedTypeDef = ProcessBuilderRepository.extractObjectTypeDefinition(solutionObject);
        console.log(extractedTypeDef);
        expect(isEqual(extractedTypeDef, solutionTypeDef)).toBeTrue();
    });

    describe('transitive object / type def transformation', () => {

        let pseudoObject: object = solutionObject;
        for (let index = 0; index < 10; index++) {

            const displayIndex = index + 1;
            it(`should provide correct result in iteration ${displayIndex}`, () => {

                let extractedTypeDef = ProcessBuilderRepository.extractObjectTypeDefinition(pseudoObject);
                expect(isEqual(extractedTypeDef, solutionTypeDef)).toBeTrue();

                pseudoObject = ProcessBuilderRepository.createPseudoObjectFromIParamDefinition(extractedTypeDef as IParam) as object;
                expect(isEqual(pseudoObject, solutionObject)).toBeTrue();

            });

        }

    });


});