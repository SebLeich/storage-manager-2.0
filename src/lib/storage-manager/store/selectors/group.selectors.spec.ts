import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { isEqual } from 'lodash';
import { GroupDataGenerator } from './test/group.data-generator';
import { State } from '../reducers/group.reducers';
import { selectGroupById, selectGroups } from './group.selectors';
import { IGroup, IOrder } from '@smgr/interfaces';
import defaultImportsConstant from 'src/app/default-imports.constant';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

describe('IGroup Selectors', () => {

    let store: MockStore;

    const groups: IGroup[] = new GroupDataGenerator().generateGroups(10);
    const groupMap: { [key: string]: IGroup } = {};
    groups.forEach(group => groupMap[group.id] = group);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ...defaultImportsConstant
            ],
            providers: [
                provideMockStore({
                    initialState: {
                        group: {
                            entities: groupMap,
                            ids: groups.map(group => group.id),
                            selectedGroupId: null
                        } as State
                    }
                }),
            ]
        });

        store = TestBed.inject(MockStore);
    });

    it('should select all groups', async () => {
        const sortedGroupGuids = groups.map(group => group.id).sort();
        const allGroups: IGroup[] = await selectSnapshot(store.select(selectGroups));

        expect(isEqual(allGroups.map(group => group!.id).sort(), sortedGroupGuids)).toBeTrue();
    });

    groups.forEach(group => {

        it(`should select group ${group.id} correctly`, async () => {
            const groupWithIdentifier: IOrder = await selectSnapshot(store.select(selectGroupById(group.id)));
    
            expect(groupWithIdentifier).toBeTruthy();
            expect(isEqual(groupWithIdentifier, group)).toBeTruthy();
        });

    })

});
