import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { TranslationService } from '@/lib/translation';
import { toSignal } from '@angular/core/rxjs-interop';
import { Container } from '@/lib/storage-manager/types/container.type';
import { Unit } from '@/app/types/unit.type';

@Component({
    selector: 'app-container-preview',
    templateUrl: './container-preview.component.html',
    styleUrls: ['./container-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContainerPreviewComponent {
    public container = input<Container | null | undefined>();
    public unit = input<Unit>('mm');

    public goodsCount = computed(() => this.container()?.goods.length ?? 0);
    public usedSpace = computed(() => {
        const container = this.container();
        return (container?.goods ?? []).reduce((agg, curr) => agg += (curr.length * curr.width * curr.height), 0);
    });

    public totalSpace = computed(() => {
        const container = this.container();
        return (container?.height ?? 0) * (container?.length ?? 0) * (container?.width ?? 0);
    });

    public datasets = computed(() => {
        const datasets = [{
            backgroundColor: ['rgba(101, 166, 90,  0.6)', 'rgba(214, 55, 55,  0.6)'],
            borderColor: ['rgba(101, 166, 90, 1)', 'rgba(214, 55, 55, 1)'],
            data: [0, 0],
            hoverBackgroundColor: ['rgba(101, 166, 90,  0.2)', 'rgba(214, 55, 55,  0.2)'],
            hoverBorderColor: ['rgba(101, 166, 90, .7)', 'rgba(214, 55, 55, .7)'],
        }],
            used = this.usedSpace(),
            total = this.totalSpace();

        return [...datasets.map(dataset => ({ ...dataset, data: [used, total - used] }))];
    });

    public percentage = computed(() => {
        const used = this.usedSpace(),
            total = this.totalSpace();

        return ((used / total) * 100);
    });

    public languageChanged = toSignal(this._translationService.afterLanguageChanged$);

    public labels = computed(() => {
        const _ = this.languageChanged();
        return ['blocked', 'free'].map(label => this._translationService.translate(`defaults.${label}` as any));
    });
    
    public type = 'doughnut';
    public options: ChartConfiguration['options'] = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const dataSets = tooltipItem.dataset.data;
                        const index = tooltipItem.dataIndex;
                        const data = dataSets[index];
                        const total: number = tooltipItem.dataset.data.reduce((previousValue, currentValue) => {
                            return (previousValue as number) + (currentValue as number);
                        }, 0) as number;
                        return `${Math.floor((((data as number) / total) * 100) + 0.5)} %`;
                    }
                }
            }
        },
    }

    constructor(private _translationService: TranslationService) { }

}
