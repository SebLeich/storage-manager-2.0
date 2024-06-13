import { ChangeDetectionStrategy, Component, DestroyRef, Injector, computed, forwardRef, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectGroups } from '../../store/group.selectors';

@Component({
    selector: 'app-group-selection',
    templateUrl: './group-selection.component.html',
    styleUrl: './group-selection.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GroupSelectionComponent),
            multi: true
        }
    ]
})
export class GroupSelectionComponent implements ControlValueAccessor {
    public groups = this._store.selectSignal(selectGroups);
    private _initialValue = signal<string | null>(null);

    public valueControl = new FormControl<string | null>(null);
    public valueChanged = toSignal(this.valueControl.valueChanges, { injector: this._injector, initialValue: null });

    public currentGroupColor = computed(() => {
        const groups = this.groups(),
            value = this.valueChanged();

        return groups.find(group => group.id === value)?.color ?? '';
    });

    public onTouched: () => void = () => { };

    constructor(private _store: Store, private _destroyRef: DestroyRef, private _injector: Injector) { }

    public registerOnTouched = (fn: any) => this.onTouched = fn;

    public registerOnChange(fn: any): void {
        this.valueControl
            .valueChanges
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((value) => fn?.(value));
    }

    public setDisabledState?(isDisabled: boolean): void {
        isDisabled ? this.valueControl.disable() : this.valueControl.enable();
    }

    public writeValue(val: any): void {
        this._initialValue.set(val);
        this.valueControl.setValue(val);
    }
}
