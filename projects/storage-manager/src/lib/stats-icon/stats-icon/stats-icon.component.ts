import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-stats-icon',
    templateUrl: './stats-icon.component.html',
    styleUrl: './stats-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatsIconComponent {
    public width = input<number>(24);
}
