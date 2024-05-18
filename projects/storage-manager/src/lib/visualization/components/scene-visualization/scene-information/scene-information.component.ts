import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-scene-information',
    templateUrl: './scene-information.component.html',
    styleUrl: './scene-information.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneInformationComponent {
    public zoomLevel = input<number>(1);
    public cameraPosition = input<{ x: number, y: number, z: number }>({ x: 0, y: 0, z: 0 });
}
