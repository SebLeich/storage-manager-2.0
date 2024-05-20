import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-scene-information',
    templateUrl: './scene-information.component.html',
    styleUrl: './scene-information.component.scss',
    changeDetection: ChangeDetectionStrategy.Default
})
export class SceneInformationComponent {
    public zoomLevel = input<number | null | undefined>(null);
    public cameraPosition = input<{ x: number, y: number, z: number } | null | undefined>(null);
}
