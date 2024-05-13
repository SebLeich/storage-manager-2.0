import { selectCurrentSolutionCalculationDate, selectCurrentSolutionCalculationSourceTitle, selectCurrentSolutionContainer, selectCurrentSolutionDescription } from '../../../store/visualization.selectors';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-visualization-sidebar',
    templateUrl: './visualization-sidebar.component.html',
    styleUrl: './visualization-sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisualizationSidebarComponent {
    private _store = inject(Store);

    public calculationSourceTitle$ = this._store.select(selectCurrentSolutionCalculationSourceTitle);
    public calculationDate$ = this._store.select(selectCurrentSolutionCalculationDate);
    public solutionDescription$ = this._store.select(selectCurrentSolutionDescription);
    public solutionContainer$ = this._store.select(selectCurrentSolutionContainer);
}
