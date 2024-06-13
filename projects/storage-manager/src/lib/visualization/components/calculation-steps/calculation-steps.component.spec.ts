import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CalculationStepsComponent } from './calculation-steps.component';
import { TranslationModule } from '@/lib/translation';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgLetModule } from 'ng-let';

describe('CalculationStepsComponent', () => {
    let spectator: Spectator<CalculationStepsComponent>;

    const createComponent = createComponentFactory({
        component: CalculationStepsComponent,
        imports: [
            MatIconModule,
            MatToolbarModule,
            NgLetModule,
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
