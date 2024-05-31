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
    @Output() public showBaseGridChanged = new EventEmitter<boolean>();
    @Output() public showContainerUnloadingArrowChanged = new EventEmitter<boolean>();
    @Output() public backgroundColorChanged = new EventEmitter<string>();

    public orientation = input<'horizontal' | 'vertical'>('vertical');
    public containerColor = input<WallTexture>("black");
    public showBaseGrid = input<boolean>(false);
    public showContainerUnloadingArrow = input<boolean>(false);
    public backgroundColor = input<string>('#ffffff');
}
