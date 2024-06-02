import { ObjectSite } from '@/lib/storage-manager/types/object-site.type';
import { WallTexture } from '@/lib/storage-manager/types/wall-texture.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';

@Component({
    selector: 'app-scene-settings',
    templateUrl: './scene-settings.component.html',
    styleUrl: './scene-settings.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneSettingsComponent {
    @Output() public visibilityChanged = new EventEmitter<boolean>();
    @Output() public containerColorChanged = new EventEmitter<WallTexture>();
    @Output() public showBaseGridChanged = new EventEmitter<boolean>();
    @Output() public showContainerUnloadingArrowChanged = new EventEmitter<boolean>();
    @Output() public backgroundColorChanged = new EventEmitter<string>();
    @Output() public wallObjectSitesChanged = new EventEmitter<ObjectSite[]>();
    @Output() public goodLabelObjectSitesChanged = new EventEmitter<ObjectSite[]>();
    @Output() public showContainerEdgesChanged = new EventEmitter<boolean>();
    @Output() public showGoodEdgesChanged = new EventEmitter<boolean>();

    public orientation = input<'horizontal' | 'vertical'>('vertical');
    public containerColor = input<WallTexture>("black");
    public wallObjectSites = input<ObjectSite[]>([]);
    public goodLabelObjectSites = input<ObjectSite[]>([]);
    public showBaseGrid = input<boolean>(false);
    public showContainerUnloadingArrow = input<boolean>(false);
    public showContainerEdges = input<boolean>(false);
    public showGoodEdges = input<boolean>(false);
    public backgroundColor = input<string>('#ffffff');
}
