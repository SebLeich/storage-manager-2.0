
import { TranslationModule } from '@/lib/translation';
import { NavbarComponent } from './navbar.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('NavbarComponent', () => {
    let spectator: Spectator<NavbarComponent>;

    const createComponent = createComponentFactory({
        component: NavbarComponent,
        imports: [
            TranslationModule
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
