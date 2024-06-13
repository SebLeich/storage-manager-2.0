import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, Injector, OnDestroy, OnInit, computed } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { selectGroups } from '../../store/group.selectors';
import { debounceTime, filter, firstValueFrom, map, startWith, switchMap, timer } from 'rxjs';
import { Group } from '@/lib/storage-manager/types/group.type';
import { v4 } from 'uuid';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { addGroup, setGroups } from '../../store/group.actions';

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrl: './group-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListComponent implements OnDestroy, OnInit {
    public groupsChanged$ = this._store
        .select(selectGroups)
        .pipe(
            filter(groups => {
                const formArrayValue = this.formArray?.().value ?? [];
                if (groups.length !== formArrayValue.length) {
                    return true;
                }

                return groups
                    .some((order, index) => {
                        const formOrder = formArrayValue[index] as Group;
                        return Object.keys(order).some((key) => order[key as keyof Group] !== formOrder[key as keyof Group]);
                    });
            })
        );

    public groups = toSignal(this.groupsChanged$, { injector: this._injector, initialValue: [] });

    public formArray = computed(() => {
        const groups = this.groups() as Group[];
        if (groups.length === 0) {
            groups.push({ color: this._generateRandomColor(), desc: null, id: v4(), sequenceNumber: 0 } as Group);
        }

        const formGroups = groups.map(group => new FormGroup<Partial<{ [key in keyof Group]: FormControl<Group[key]> }>>({
            id: new FormControl(group.id, { nonNullable: true }),
            desc: new FormControl(group.desc),
            sequenceNumber: new FormControl(group.sequenceNumber, { nonNullable: true }),
            color: new FormControl(group.color, { nonNullable: true }),
        }));

        return new FormArray(formGroups);
    });

    public formArray$ = toObservable(this.formArray);
    public formArrayValueChanges$ = this.formArray$.pipe(switchMap(formArray => formArray.valueChanges));

    public validFormArrayControlCount$ = this.formArray$
        .pipe(
            switchMap(formArray => formArray.statusChanges.pipe(map(() => formArray))),
            map(formArray => formArray.controls.filter(control => control.valid).length),
            startWith(this.formArray().controls.filter(control => control.valid).length)
        );


    constructor(private _destroyRef: DestroyRef, private _store: Store, private _injector: Injector, private _elementRef: ElementRef) { }

    public async addGroup(): Promise<void> {
        this._syncGroups();

        const group = { id: v4(), desc: null, color: this._generateRandomColor() } as Group;
        this._store.dispatch(addGroup({ group }));


        await this._tryFocusFirstInputFromRow('last');
        this.formArray().controls.forEach(control => control.updateValueAndValidity());
    }

    public ngOnDestroy(): void {
        const formArrayValue = this.formArray().value as Group[];
        this._syncGroups(formArrayValue);
    }

    public ngOnInit(): void {
        this.formArrayValueChanges$
            .pipe(takeUntilDestroyed(this._destroyRef), debounceTime(1000))
            .subscribe(groups => this._syncGroups(groups as Group[]));
    }

    public async removeGroup(index: number): Promise<void> {
        this._syncGroups();

        const groups = this.formArray();
        groups.removeAt(index);

        this._syncGroups(groups.getRawValue() as Group[]);

        await this._tryFocusFirstInputFromRow('last');
        this.formArray().controls.forEach(control => control.updateValueAndValidity());
    }

    private _generateRandomColor(): string {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    private _syncGroups(groups: Group[] = this.formArray().value as Group[]): void {
        this._store.dispatch(setGroups({ groups }));
    }

    private async _tryFocusFirstInputFromRow(position: 'first' | 'last'): Promise<void> {
        await firstValueFrom(timer(1));

        const rows = (this._elementRef.nativeElement as HTMLElement).querySelectorAll('.order-wrapper');
        const row = rows[position === 'first' ? 0 : rows.length - 1] as HTMLElement | null;
        if (!row) {
            return;
        }

        const input = row.querySelector('input');
        input?.focus();
    }
}
