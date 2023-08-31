import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { isEqual } from 'lodash';
import { SolutionDataGenerator } from './test/solution.data-generator';
import { State } from '../reducers/solution.reducers';
import { selectSolutionById, selectSolutions } from './solution.selectors';
import { ISolution } from '../../interfaces/solution.interface';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

describe('ISolution Selectors', () => {

    let store: MockStore;

    const solutions: ISolution[] = new SolutionDataGenerator().generateSolutions(10) as any;
    const solutionMap: { [key: string]: ISolution } = {};
    solutions.forEach(solution => solutionMap[solution.id] = solution);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...defaultImportsConstant
            ],
            providers: [
                provideMockStore({
                    initialState: {
                        solution: {
                            entities: solutionMap,
                            ids: solutions.map(solution => solution.id),
                            selectedSolutionId: null
                        } as State
                    }
                }),
            ]
        });

        store = TestBed.inject(MockStore);
    });

    it('should select all solutions', async () => {
        const sortedSolutionGuids = solutions.map(solution => solution.id).sort();
        const allSolutions: ISolution[] = await selectSnapshot(store.select(selectSolutions));

        expect(isEqual(allSolutions.map(group => group!.id).sort(), sortedSolutionGuids)).toBeTrue();
    });

    solutions.forEach(solution => {

        it(`should select solution ${solution.id} correctly`, async () => {
            const solutionWithIdentifier: ISolution = await selectSnapshot(store.select(selectSolutionById(solution.id)));
    
            expect(solutionWithIdentifier).toBeTruthy();
            expect(isEqual(solutionWithIdentifier, solution)).toBeTruthy();
        });

    })

});
