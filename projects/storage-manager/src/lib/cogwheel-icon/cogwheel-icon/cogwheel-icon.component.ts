import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-cogwheel-icon',
    templateUrl: './cogwheel-icon.component.html',
    styleUrl: './cogwheel-icon.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CogwheelIconComponent {
    public width = input<number>(24);
}
