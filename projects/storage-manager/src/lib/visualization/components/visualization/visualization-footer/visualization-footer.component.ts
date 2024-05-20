import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-visualization-footer',
    templateUrl: './visualization-footer.component.html',
    styleUrl: './visualization-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationFooterComponent {
    @Input() public showBaseGrid: boolean = false;
    @Input() public showViewInformation: boolean = false;

    @Output() public zoomIn = new EventEmitter<void>();
    @Output() public zoomOut = new EventEmitter<void>();
    @Output() public moveLeft = new EventEmitter<void>();
    @Output() public moveRight = new EventEmitter<void>();
    @Output() public moveUp = new EventEmitter<void>();
    @Output() public moveDown = new EventEmitter<void>();
    @Output() public reset = new EventEmitter<void>();

    @Output() public baseGridToggled = new EventEmitter<boolean>();
    @Output() public viewInformationToggled = new EventEmitter<boolean>();

    public toggleBaseGrid(): void {
        const showBaseGrid = !this.showBaseGrid;
        this.baseGridToggled.emit(showBaseGrid);
    }

    public toggleViewInformation(): void {
        const showViewInformation = !this.showViewInformation;
        this.viewInformationToggled.emit(showViewInformation);
    }
}
