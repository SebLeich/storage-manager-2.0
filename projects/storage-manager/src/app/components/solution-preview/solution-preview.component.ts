import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { showAnimation } from 'src/lib/shared/animations/show';
import { Store } from '@ngrx/store';
import { IGroup } from '@smgr/interfaces';
import { downloadCurrentSolution, selectCurrentSolution, selectCurrentSolutionGoods, selectGroups, selectHasMultipleSolutions, selectSolutions, setNextSolution, updateGroup } from '@smgr/store';
import { ValidationService } from '@/lib/visualization/services/validation/validation.service';

@Component({
    selector: 'app-solution-preview',
    templateUrl: './solution-preview.component.html',
    styleUrls: ['./solution-preview.component.scss'],
    animations: [showAnimation],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolutionPreviewComponent {

    public solutions$ = this._store.select(selectSolutions);
    public hasMultipleSolutions$ = this._store.select(selectHasMultipleSolutions);
    public currentSolution$ = this._store.select(selectCurrentSolution).pipe(filter(solution => !!solution));
    public currentSolutionValidation$ = this.currentSolution$.pipe(map(solution => ValidationService.validateSolution(solution!)));
    public headline$ = this.currentSolution$.pipe(map(solution => solution?.description));
    public algorithm$ = this.currentSolution$.pipe(map(solution => solution?.calculationSource?.title));
    public calculated$ = this.currentSolution$.pipe(map(solution => solution?.calculated));
    public container$ = this.currentSolution$.pipe(map(solution => solution?.container));
    public groups$ = this._store.select(selectGroups);
    public goods$ = this._store.select(selectCurrentSolutionGoods);

    constructor(private _store: Store) { }

    public downloadSolution = () => this._store.dispatch(downloadCurrentSolution());

    public groupColorChanged(arg: { group: IGroup, color: string }) {
        this._store.dispatch(updateGroup({
            group: {
                ...arg.group,
                color: arg.color
            }
        }));
    }

    public nextSolution() {
        this._store.dispatch(setNextSolution());
    }

}
