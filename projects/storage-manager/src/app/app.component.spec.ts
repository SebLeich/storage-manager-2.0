import { AppComponent } from './app.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('AppComponent', () => {
    let spectator: Spectator<AppComponent>;

    const createComponent = createComponentFactory({
        component: AppComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
