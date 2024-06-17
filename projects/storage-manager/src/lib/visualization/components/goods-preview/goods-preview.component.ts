import { Good } from '@/lib/storage-manager/types/good.type';
import { Group } from '@/lib/storage-manager/types/group.type';
import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, EventEmitter, OnInit, Output, computed, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-goods-preview',
    templateUrl: './goods-preview.component.html',
    styleUrl: './goods-preview.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoodsPreviewComponent implements OnInit {
    public goods = input<Good[]>([]);
    public hiddenGoods = input<string[]>([]);
    public groups = input<Group[]>([]);
    public hoveredGood = input<string | null>(null);

    public hoveredGood$ = toObservable(this.hoveredGood);

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

    constructor(private _destroyRef: DestroyRef, private _elementRef: ElementRef) { }

    public ngOnInit() {
        this.hoveredGood$
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(hoveredGood => this._tableWrapper?.scrollTo({ top: this._getScrollTop(hoveredGood), behavior: 'smooth' }));
    }

    private _getScrollTop(goodId: string | null): number {
        const goodElement = this._elementRef.nativeElement.querySelector(`[data-good-id="${goodId}"]`);
        return goodElement ? goodElement.offsetTop : 0;
    }

    private get _tableWrapper(): HTMLElement | null {
        return this._elementRef.nativeElement.querySelector('.table-wrapper');
    }
}
