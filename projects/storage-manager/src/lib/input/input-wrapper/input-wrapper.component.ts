import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Injector, computed, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';

@Component({
    selector: 'app-input-wrapper',
    templateUrl: './input-wrapper.component.html',
    styleUrl: './input-wrapper.component.scss',
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputWrapperComponent implements AfterViewInit {
    public label = input<string | null | undefined>(null);
    public labelBadgeColor = input<string | null | undefined>(null);
    public isCheckbox = input<boolean>(false);
    public isColor = input<boolean>(false);
    public control = input<AbstractControl | null | undefined>(null);
    public formControlStatus = computed(() => {
        const formControl = this.control();
        if (!formControl) {
            return of('VALID');
        }

        return formControl.statusChanges;
    });

    constructor(private elementRef: ElementRef<HTMLDivElement>, private _changeDetectorRef: ChangeDetectorRef, private _injector: Injector) { }

    public labelClicked(): void {
        const projectedContent = this.projectedContent;
        projectedContent?.focus();
    }

    public ngAfterViewInit(): void {
        if (this.isCheckbox() && this.input) {
            this.input.checked = this.input.value === 'true';
            this._changeDetectorRef.markForCheck();
        }
    }

    public onClick(event: MouseEvent): void {
        this._changeDetectorRef.detectChanges();
        if (!this.isCheckbox || event.target === this.input) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const input = this.input;
        input?.click();
    }

    public get projectedContent(): HTMLInputElement | null {
        return this.elementRef.nativeElement.querySelector('input,select');
    }

    public get input(): HTMLInputElement | null {
        return this.elementRef
            .nativeElement
            .querySelector('input');
    }
}
