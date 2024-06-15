import { MatIconModule } from '@angular/material/icon';
import { VisualizationFooterComponent } from './visualization-footer.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslationModule } from '@/lib/translation';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('VisualizationFooterComponent', () => {
    let spectator: Spectator<VisualizationFooterComponent>;

    const createComponent = createComponentFactory({
        component: VisualizationFooterComponent,
        imports: [
            MatIconModule,
            MatMenuModule,
            MatTooltipModule,
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
