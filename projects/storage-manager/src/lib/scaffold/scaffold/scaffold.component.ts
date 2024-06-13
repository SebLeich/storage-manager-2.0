import { fadeInAnimation } from '@/lib/shared/animations/fade-in.animation';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-scaffold',
    templateUrl: './scaffold.component.html',
    styleUrl: './scaffold.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation]
})
export class ScaffoldComponent {
    public mainContentBorderRadius = input<'none' | 'standard'>('standard');
}
