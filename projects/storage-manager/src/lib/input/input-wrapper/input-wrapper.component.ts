import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, input } from '@angular/core';

@Component({
    selector: 'app-input-wrapper',
    templateUrl: './input-wrapper.component.html',
    styleUrl: './input-wrapper.component.scss',
    changeDetection: ChangeDetectionStrategy.Default
})
export class InputWrapperComponent implements AfterViewInit {
    public label = input<string | null | undefined>(null);
    public isCheckbox = input<boolean>(false);
    public isColor = input<boolean>(false);

    constructor(private elementRef: ElementRef<HTMLDivElement>, private _changeDetectorRef: ChangeDetectorRef) { }

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
