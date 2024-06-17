import { Good } from '@/lib/storage-manager/types/good.type';
import { Group } from '@/lib/storage-manager/types/group.type';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input } from '@angular/core';

@Component({
    selector: 'app-goods-preview',
    templateUrl: './goods-preview.component.html',
    styleUrl: './goods-preview.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsPreviewComponent {
    public goods = input<Good[]>([]);
    public hiddenGoods = input<string[]>([]);
    public groups = input<Group[]>([]);
    public hoveredGood = input<string | null>(null);

    public goodWrappers = computed(() => {
        const goods = this.goods(),
            hiddenGoods = this.hiddenGoods(),
            hoveredGood = this.hoveredGood();

        return goods.map(good => ({
            good,
            hidden: hiddenGoods.includes(good.id),
            hovered: hoveredGood === good.id
        }));
    });

    @Output() public toggleGoodVisibility = new EventEmitter<string>();

    public groupColorMap = computed(() => {
        return this.groups()
            .reduce((acc, group) => {
                acc[group.id] = group.color;
                return acc;
            }, {} as Record<string, string | null>);
    });
}
