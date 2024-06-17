import { NavbarComponent } from '@/lib/navbar/components/navbar/navbar.component';
import { ScaffoldComponent } from './scaffold.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TranslationModule } from '@/lib/translation';

describe('ScaffoldComponent', () => {
    let spectator: Spectator<ScaffoldComponent>;

    const createComponent = createComponentFactory({
        component: ScaffoldComponent,
        declarations: [NavbarComponent],
        imports: [TranslationModule]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
