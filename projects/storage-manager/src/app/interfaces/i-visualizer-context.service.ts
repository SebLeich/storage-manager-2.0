import { InjectionToken } from "@angular/core";
import { IGood } from "@smgr/interfaces";
import { Observable } from "rxjs";

export interface IVisualizerContextService {
    hoveredGood$: Observable<IGood | null>;
    reRenderingTriggered$: Observable<void>;
    selectedGood$: Observable<IGood | null>;
    hoverGood(good: IGood | null): void;
    hoverGoodById(good: string | null): Promise<void>;
    reRenderCompletely(): void;
    selectGood(good: IGood | null): void;
    selectGoodById(good: string | null): Promise<void>;
}

export const VISUALIZER_CONTEXT = new InjectionToken<IVisualizerContextService>('VISUALIZER_CONTEXT_TOKEN');
