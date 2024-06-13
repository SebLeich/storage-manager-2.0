import { NavbarComponent } from '@/lib/navbar/components/navbar/navbar.component';
import { ScaffoldComponent } from './scaffold.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('ScaffoldComponent', () => {
    let spectator: Spectator<ScaffoldComponent>;

    const createComponent = createComponentFactory({
        component: ScaffoldComponent,
        componentMocks: [NavbarComponent]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
