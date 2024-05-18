import { TranslationService } from '@/lib/translation';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'app-scaffold',
    templateUrl: './scaffold.component.html',
    styleUrl: './scaffold.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScaffoldComponent {

    public activeNavItem = 'Visualization';

    public navbarOptions = [
        'Home',
        'About',
        'Calculation',
        'Visualization'
    ];

    public currentLangISO3166$ = this._translationService.currentLanguageCountryISO3166$;

    constructor(private _changeDetectorRef: ChangeDetectorRef, private _translationService: TranslationService) { }

    public setNavItem(navItem: string): void {
        this.activeNavItem = navItem;

        this._changeDetectorRef.markForCheck();
    }

    public setNextLanguage(): void {
        this._translationService.nextLanguage();
    }

}
