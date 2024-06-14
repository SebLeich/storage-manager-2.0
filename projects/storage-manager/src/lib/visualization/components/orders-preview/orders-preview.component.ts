import { Good } from '@/lib/storage-manager/types/good.type';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-orders-preview',
    templateUrl: './orders-preview.component.html',
    styleUrl: './orders-preview.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPreviewComponent {
    public goods = input<Good[]>([]);
}
