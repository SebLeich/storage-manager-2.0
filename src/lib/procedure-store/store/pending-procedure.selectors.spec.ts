import { TestBed } from '@angular/core/testing';
import { selectAllProcedures, selectGlobalProcedureProgress, selectHasDeterminingProcedures, selectHasPendingProcedures, selectMostRecentlyFinishedProcedure, selectPendingProcedures } from './pending-procedure.selectors';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { IProcedure } from 'src/lib/procedure-store/interfaces/procedure.interface';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';
import { announceProcedures } from './pending-procedure.actions';

describe('IPendingProcedures Selectors', () => {

    let store: Store;

    const mostRecentlyFinishedProcedureGuid = "mostRecentlyFinishedProcedure";
    const pendingProcedures = {
        1: { guid: 'procedure1', progress: 0, startedUnix: moment().add(-10, 'seconds').unix(), finishedUnix: null } as IProcedure,
        2: { guid: 'procedure2', progress: 30, startedUnix: moment().add(-20, 'seconds').unix(), finishedUnix: null } as IProcedure,
        3: { guid: 'procedure3', progress: 100, startedUnix: moment().add(-60, 'seconds').unix(), finishedUnix: moment().add(-1, 'days').unix() } as IProcedure,
        4: { guid: mostRecentlyFinishedProcedureGuid, progress: true, startedUnix: moment().add(-70, 'seconds').unix(), finishedUnix: moment().unix() } as IProcedure
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...defaultImportsConstant
            ]
        });

        store = TestBed.inject(Store);
        store.dispatch(announceProcedures({ procedures: Object.values(pendingProcedures) }));
    });

    it('should select all procedures', async () => {
        const sortedProcedureGuids = Object.values(pendingProcedures).map(procedure => procedure.guid).sort();
        const allProcedures = await selectSnapshot(store.select(selectAllProcedures));

        expect(allProcedures.map(procedure => procedure!.guid).sort()).toEqual(sortedProcedureGuids);
    });

    it('should detect correct determination state', async () => {
        const hasDeterminingProcedures = Object.values(pendingProcedures)
            .some(procedure => typeof procedure.progress === 'number');

        let receviedHasDeterminingProcedures = await selectSnapshot(store.select(selectHasDeterminingProcedures));

        expect(receviedHasDeterminingProcedures).toBe(hasDeterminingProcedures);
    });

    it('should select correct global progress', async () => {
        const allDeterminateProcedures = Object.values(pendingProcedures)
            .filter(procedure => typeof procedure.progress === 'number' && procedure.progress < 100);

        const totalGlobalProgress = allDeterminateProcedures
            .map(procedure => procedure.progress as number)
            .reduce((prev, curr) => prev + curr, 0);

        const expectedProgress = totalGlobalProgress / allDeterminateProcedures.length;

        let globalProgress = await selectSnapshot(store.select(selectGlobalProcedureProgress));

        expect(globalProgress).toBe(expectedProgress);
    });

    it('should return correct pending tasks', async () => {
        const expectedPendingProcedureGuids = Object.values(pendingProcedures)
            .filter(procedure => (procedure.progress === false) || (typeof procedure.progress === 'number' && procedure.progress < 100))
            .map(procedure => procedure.guid)
            .sort();

        const receviedPendingProcedures = await selectSnapshot(store.select(selectPendingProcedures));

        expect(receviedPendingProcedures.map(procedure => procedure?.guid).sort()).toEqual(expectedPendingProcedureGuids);
    });

    it('should detect pending tasks correctly', async () => {
        const expectedPendingTasks = Object.values(pendingProcedures).some(procedure => (procedure.progress === false) || (typeof procedure.progress === 'number' && procedure.progress < 100))
        const hasPendingTasks = await selectSnapshot(store.select(selectHasPendingProcedures));

        expect(hasPendingTasks).toBe(expectedPendingTasks);
    });

    it('should return correct most recently finished procedure', async () => {
        const mostRecentlyFinishedProcedure = await selectSnapshot(store.select(selectMostRecentlyFinishedProcedure));

        expect(mostRecentlyFinishedProcedure).toBeTruthy();
        expect(mostRecentlyFinishedProcedure?.guid).toBe(mostRecentlyFinishedProcedureGuid);
    });

});
