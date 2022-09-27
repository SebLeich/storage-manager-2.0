import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IGood } from 'src/app/interfaces/i-good.interface';
import { IVisualizerContextService } from 'src/app/interfaces/i-visualizer-context.service';
import { selectCurrentSolutionGoods } from 'src/app/store/selectors/i-solution.selectors';
import { selectSnapshot } from 'src/lib/process-builder/globals/select-snapshot';

@Injectable()
export class VisualizerComponentService implements IVisualizerContextService {

  private _hoveredGood = new BehaviorSubject<IGood | null>(null);
  private _reRenderingTriggered = new Subject<void>();
  private _selectedGood = new BehaviorSubject<IGood | null>(null);

  public hoveredGood$: Observable<IGood | null> = this._hoveredGood.asObservable();
  public reRenderingTriggered$: Observable<void> = this._reRenderingTriggered.asObservable();
  public selectedGood$: Observable<IGood | null> = this._selectedGood.asObservable();

  constructor(private _store: Store) { }

  public hoverGood(good: IGood | null): void {
    this._hoveredGood.next(good);
  }

  public async hoverGoodById(goodId: string | null) {
    if (!goodId) {
      this._hoveredGood.next(null);
      return;
    }

    const goods = await selectSnapshot(this._store.select(selectCurrentSolutionGoods));
    this._hoveredGood.next(goods.find(good => good.id === goodId) ?? null);
  }

  public reRenderCompletely(): void {
    this._reRenderingTriggered.next();
  }

  public selectGood(good: IGood | null): void {
    this._selectedGood.next(good);
  }

  public async selectGoodById(goodId: string | null) {
    if (!goodId) {
      this._selectedGood.next(null);
      return;
    }

    const goods = await selectSnapshot(this._store.select(selectCurrentSolutionGoods));
    this._selectedGood.next(goods.find(good => good.id === goodId) ?? null);
  }
}
