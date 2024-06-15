
import { TranslationModule } from '@/lib/translation';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { GoodsPreviewComponent } from './goods-preview.component';

describe('GoodsPreviewComponent', () => {
    let spectator: Spectator<GoodsPreviewComponent>;
    const createComponent = createComponentFactory({
        component: GoodsPreviewComponent,
        imports: [
            TranslationModule
        ],
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });

    it('should display all goods', () => {
        const goods = [
            { id: '1', desc: 'Good 1' },
            { id: '2', desc: 'Good 2' },
            { id: '3', desc: 'Good 3' }
        ];

        spectator.setInput('goods', goods);
        expect(spectator.queryAll('.good-wrapper')).toHaveLength(goods.length);
    })
});
