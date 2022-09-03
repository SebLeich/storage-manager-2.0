import { ProcessBuilderRepository } from './process-builder-repository';
import solutionObject from './test/solution.test-data.json';

describe('Test Process Builder Repository', () => {

    it('should extract correct type definition', () => {
        const result = ProcessBuilderRepository.extractObjectTypeDefinition(solutionObject);
        expect(result).toBeTruthy();
    });

});