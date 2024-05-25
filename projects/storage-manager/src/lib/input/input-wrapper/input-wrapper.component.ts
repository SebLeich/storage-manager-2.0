import { ChangeDetectionStrategy, Component, ElementRef, input } from '@angular/core';

@Component({
    selector: 'app-input-wrapper',
    templateUrl: './input-wrapper.component.html',
    styleUrl: './input-wrapper.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputWrapperComponent {
    public label = input<string | null | undefined>(null);

    constructor(private elementRef: ElementRef<HTMLDivElement>) {}

    public labelClicked(): void {
        const projectedContent = this.projectedContent;
        projectedContent?.focus();
    }

    public get projectedContent(): HTMLInputElement | null {
        return this.elementRef.nativeElement.querySelector('input,select');
    }
}
