import { By } from '@angular/platform-browser';
import { ContainerPreviewComponent } from './container-preview.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Container } from '@/lib/storage-manager/types/container.type';
import { TranslationModule } from '@/lib/translation';

describe('ContainerPreviewComponent', () => {
    let spectator: Spectator<ContainerPreviewComponent>;
    const createComponent = createComponentFactory({
        component: ContainerPreviewComponent,
        imports: [
            TranslationModule
        ],
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });

    it('should display no container hint in case no container available', () => {
        expect(spectator.fixture.debugElement.query(By.css('.no-content-available'))).toBeTruthy();
    });

    it('should display container preview and properties in case container is available', () => {
        spectator.setInput('container', { 'height': 10, 'length': 10, 'width': 10 } as Container);

        expect(spectator.fixture.debugElement.queryAll(By.css('.description')).length).toBe(1);
        expect(spectator.fixture.debugElement.queryAll(By.css('.property-row .property')).length).toBe(4);
        expect(spectator.fixture.debugElement.queryAll(By.css('.chart-wrapper')).length).toBe(1);
    });
});
