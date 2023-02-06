import { TestBed } from '@angular/core/testing';
import { announceProcedure, announceProcedures } from '../actions/pending-procedure.actions';
import { selectAllProcedures, selectPendingProcedures } from '../selectors/i-pending-procedure.selectors';

import { Store } from '@ngrx/store';

import * as moment from 'moment';
import { v4 as generateGuid } from 'uuid';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { IProcedure } from 'src/app/interfaces/i-procedure.interface';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

describe('IPendingProcedures Reducers', () => {

    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ ...defaultImportsConstant ]
        });

        store = TestBed.inject(Store);
    });

    const procedures = [
        undefined,
        {},
        { guid: generateGuid() },
        { finishedUnix: moment().unix() } as IProcedure,
        null
    ] as IProcedure[];

    procedures.forEach((procedure, index) => {

        it(`should announce procedure correctly: ${procedure?.guid ?? 'undefined in run ' + index}`, async () => {
            store.dispatch(announceProcedure({ procedure }));
            const addedProcedure = (await selectSnapshot(store.select(selectPendingProcedures)))[0];
            expect(addedProcedure).toBeTruthy();
            expect(addedProcedure!.guid).toBeTruthy();
            if (procedure?.guid) {
                expect(addedProcedure!.guid).toBe(procedure.guid);
            }
            expect(addedProcedure!.startedUnix).toBeTruthy();
        });

    });

    describe('should announce all procedures correctly', () => {

        beforeEach(async () => {
            store.dispatch(announceProcedures({ procedures }));
        });

        procedures.forEach((_, index) => {

            it(`should have announced procedure at index ${index} correctly`, async () => {
                const procedures = await selectSnapshot(store.select(selectAllProcedures));
                const currentProcedure = procedures[index];
                expect(currentProcedure).toBeTruthy();
                expect(currentProcedure!.guid).toBeTruthy();
                expect(currentProcedure!.startedUnix).toBeTruthy();
            });

        });
    });

});
