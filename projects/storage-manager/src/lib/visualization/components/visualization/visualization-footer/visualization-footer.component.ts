import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-visualization-footer',
    templateUrl: './visualization-footer.component.html',
    styleUrl: './visualization-footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationFooterComponent {
    @Output() public zoomIn = new EventEmitter<void>();
    @Output() public zoomOut = new EventEmitter<void>();
    @Output() public moveLeft = new EventEmitter<void>();
    @Output() public moveRight = new EventEmitter<void>();
    @Output() public moveUp = new EventEmitter<void>();
    @Output() public moveDown = new EventEmitter<void>();
}
