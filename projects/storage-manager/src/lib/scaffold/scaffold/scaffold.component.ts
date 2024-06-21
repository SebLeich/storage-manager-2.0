import { fadeInAnimation } from '@/lib/shared/animations/fade-in.animation';
import { ChangeDetectionStrategy, Component, OnInit, input, signal } from '@angular/core';

@Component({
    selector: 'app-scaffold',
    templateUrl: './scaffold.component.html',
    styleUrl: './scaffold.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInAnimation]
})
export class ScaffoldComponent implements OnInit {
    public mainContentBorderRadius = input<'none' | 'standard'>('standard');
    public displayIconsHint = signal<boolean>(false);

    public ngOnInit(): void {
        const displayIconsHint = localStorage.getItem('displayIconsHint');
        this.displayIconsHint.set(displayIconsHint === 'false'? false : true);
    }

    public hideIconsHint(): void {
        this.displayIconsHint.set(false);
        localStorage.setItem('displayIconsHint', 'false');
    }
}
