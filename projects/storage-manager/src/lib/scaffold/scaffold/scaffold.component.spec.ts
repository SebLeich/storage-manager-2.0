import { ScaffoldComponent } from './scaffold.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('ScaffoldComponent', () => {
    let spectator: Spectator<ScaffoldComponent>;

    const createComponent = createComponentFactory({
        component: ScaffoldComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
