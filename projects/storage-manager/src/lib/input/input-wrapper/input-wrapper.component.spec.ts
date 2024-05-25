import { InputWrapperComponent } from './input-wrapper.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('InputWrapperComponent', () => {
    let spectator: Spectator<InputWrapperComponent>;

    const createComponent = createComponentFactory({
        component: InputWrapperComponent,
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
