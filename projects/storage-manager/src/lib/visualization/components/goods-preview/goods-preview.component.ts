import { Good } from '@/lib/storage-manager/types/good.type';
import { Group } from '@/lib/storage-manager/types/group.type';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-goods-preview',
    templateUrl: './goods-preview.component.html',
    styleUrl: './goods-preview.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsPreviewComponent {
    public goods = input<Good[]>([]);
    public groups = input<Group[]>([]);
    public hoveredGood = input<string | null>(null);

    public groupColorMap = computed(() => {
        return this.groups()
            .reduce((acc, group) => {
                acc[group.id] = group.color;
                return acc;
            }, {} as Record<string, string | null>);
    });
}
