import { TranslationService } from '@/lib/translation';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	constructor(private _snackBar: MatSnackBar, private _translationService: TranslationService, private _destroyRef: DestroyRef) { }

	public ngOnInit(): void {
		if (localStorage.getItem('consent')) {
			return;
		}

		this._translationService.afterLanguageChanged$
			.pipe(takeUntilDestroyed(this._destroyRef), take(1))
			.subscribe(() => this._showCookieConsent());
	}

	private _showCookieConsent(): void {
		this._snackBar
			.open(
				this._translationService.translate('defaults.cookieConsent'),
				this._translationService.translate('defaults.consent')
			)
			.afterDismissed()
			.subscribe(() => localStorage.setItem('consent', 'true'));
	}
}
