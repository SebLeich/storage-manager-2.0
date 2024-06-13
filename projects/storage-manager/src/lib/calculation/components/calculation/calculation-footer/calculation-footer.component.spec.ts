
import { MatIconModule } from '@angular/material/icon';
import { CalculationFooterComponent } from './calculation-footer.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslationModule } from '@/lib/translation';

describe('CalculationFooterComponent', () => {
    let spectator: Spectator<CalculationFooterComponent>;

    const createComponent = createComponentFactory({
        component: CalculationFooterComponent,
        imports: [
            MatIconModule,
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
