import { TestBed } from '@angular/core/testing';

import { IProcedure } from '../../interfaces/i-procedure.interface';
import defaultImportsConstant from '../../default-imports.constant';
import { announceProcedure, announceProcedures } from '../actions/pending-procedure.actions';
import { selectAllProcedures, selectPendingProcedures } from '../selectors/i-pending-procedure.selectors';
import { selectSnapshot } from "../../../lib/process-builder/globals/select-snapshot";

import { Store } from '@ngrx/store';

import * as moment from 'moment';
import { v4 as generateGuid } from 'uuid';

describe('IPendingProcedures Reducers', () => {

    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...defaultImportsConstant
            ]
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
