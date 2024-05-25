import { WallTexture } from '@/lib/storage-manager/types/wall-texture.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'app-scene-settings',
    templateUrl: './scene-settings.component.html',
    styleUrl: './scene-settings.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneSettingsComponent {
    @Output() public containerColorChanged = new EventEmitter<WallTexture>();

    public containerColor = input<WallTexture>("black");
}
