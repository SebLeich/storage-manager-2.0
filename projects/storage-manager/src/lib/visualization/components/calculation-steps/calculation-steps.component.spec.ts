import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CalculationStepsComponent } from './calculation-steps.component';
import { TranslationModule } from '@/lib/translation';
import { MatIconModule } from '@angular/material/icon';
import { NgLetModule } from 'ng-let';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('CalculationStepsComponent', () => {
    let spectator: Spectator<CalculationStepsComponent>;

    const createComponent = createComponentFactory({
        component: CalculationStepsComponent,
        imports: [
            MatIconModule,
            MatTooltipModule,
            NgLetModule,
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
