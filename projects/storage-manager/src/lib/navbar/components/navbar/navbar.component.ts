import { TranslationService } from '@/lib/translation';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

    public activePath$ = this._router
        .events
        .pipe(
            filter((event) => event instanceof NavigationEnd),
            map(() => location.pathname.split('/').pop()),
            startWith(location.pathname.split('/').pop())
        );

    public navbarOptions = [
        { path: 'calculation', label: undefined },
        { path: 'visualization', label: undefined },
    ];

    public currentLangISO3166$ = this._translationService.currentLanguageCountryISO3166$;

    constructor(private _router: Router, private _translationService: TranslationService) { }

    public navbarItemClicked(navItem: { label?: string, path: string }): void {
        this._router.navigate([navItem.path]);
    }

    public setNextLanguage(): void {
        this._translationService.nextLanguage();
    }
}
