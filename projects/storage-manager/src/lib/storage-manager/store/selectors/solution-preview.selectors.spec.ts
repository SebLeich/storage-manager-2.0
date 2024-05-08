import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { isEqual } from 'lodash';
import { State } from '../reducers/solution-preview.reducers';
import { SolutionPreviewDataGenerator } from './test/solution-preview.data-generator';
import { selectSolutionPreview } from './solution-preview.selectors';
import { ISolutionPreview } from '../../interfaces/solution-preview.interface';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

describe('ISolutionPreview Selectors', () => {

    let store: MockStore;

    const solutionPreviews: ISolutionPreview[] = new SolutionPreviewDataGenerator().generateSolutionPreviews(5) as any;
    const solutionPreviewMap: { [key: string]: ISolutionPreview } = {};
    solutionPreviews.forEach(solutionPreview => solutionPreviewMap[solutionPreview.solutionId] = solutionPreview);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...defaultImportsConstant
            ],
            providers: [
                provideMockStore({
                    initialState: {
                        solutionPreview: {
                            entities: solutionPreviewMap,
                            ids: solutionPreviews.map(solutionPreview => solutionPreview.solutionId),
                            selectedSolutionId: null
                        } as State
                    }
                }),
            ]
        });

        store = TestBed.inject(MockStore);
    });

    solutionPreviews.forEach(solutionPreview => {

        it(`should correctly select preview for solution ${solutionPreview.solutionId}`, async () => {
            const solutionPreviewWithIdentifier: ISolutionPreview = await selectSnapshot(store.select(selectSolutionPreview(solutionPreview.solutionId)));

            expect(solutionPreviewWithIdentifier).toBeTruthy();
            expect(isEqual(solutionPreviewWithIdentifier, solutionPreview)).toBeTruthy();
        });

    });

});
