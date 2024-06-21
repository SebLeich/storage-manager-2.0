import { ObjectSite } from "@/lib/storage-manager/types/object-site.type";
import { WallTexture } from "@/lib/storage-manager/types/wall-texture.type";
import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from "@angular/core";

@Component({
    selector: 'app-scene-settings',
    templateUrl: './scene-settings.component.html',
    styleUrl: './scene-settings.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SceneSettingsComponent {
    @Output() public addLightsChanged = new EventEmitter<boolean>();
    @Output() public backgroundColorChanged = new EventEmitter<string>();
    @Output() public containerColorChanged = new EventEmitter<WallTexture>();
    @Output() public fillEmptySpaceChanged = new EventEmitter<boolean>();
    @Output() public goodLabelObjectSitesChanged = new EventEmitter<ObjectSite[]>();
    @Output() public showBaseGridChanged = new EventEmitter<boolean>();
    @Output() public showContainerChanged = new EventEmitter<boolean>();
    @Output() public showContainerEdgesChanged = new EventEmitter<boolean>();
    @Output() public showContainerUnloadingArrowChanged = new EventEmitter<boolean>();
    @Output() public showEmptySpaceChanged = new EventEmitter<boolean>();
    @Output() public showEmptySpaceEdgesChanged = new EventEmitter<boolean>();
    @Output() public showGoodsChanged = new EventEmitter<boolean>();
    @Output() public showGoodEdgesChanged = new EventEmitter<boolean>();
    @Output() public visibilityChanged = new EventEmitter<boolean>();
    @Output() public wallObjectSitesChanged = new EventEmitter<ObjectSite[]>();

    public addLights = input<boolean>(true);
    public backgroundColor = input<string>('#ffffff');
    public containerColor = input<WallTexture>("black");
    public fillEmptySpace = input<boolean>(false);
    public goodLabelObjectSites = input<ObjectSite[]>([]);
    public orientation = input<'horizontal' | 'vertical'>('vertical');
    public showBaseGrid = input<boolean>(false);
    public showContainer = input<boolean>(false);
    public showContainerEdges = input<boolean>(false);
    public showContainerUnloadingArrow = input<boolean>(false);
    public showEmptySpace = input<boolean>(false);
    public showEmptySpaceEdges = input<boolean>(false);
    public showGoods = input<boolean>(false);
    public showGoodEdges = input<boolean>(false);
    public wallObjectSites = input<ObjectSite[]>([]);

    public wallTextures: WallTexture[] = ['black', 'blue', 'brass', 'green', 'gold', 'red', 'rusty', 'silver', 'white'];
}
