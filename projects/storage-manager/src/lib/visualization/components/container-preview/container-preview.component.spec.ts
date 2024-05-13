import { By } from '@angular/platform-browser';
import { IContainer } from '@smgr/interfaces';
import { ContainerPreviewComponent } from './container-preview.component';
import { SharedModule } from '@/lib/shared/shared.module';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('ContainerPreviewComponent', () => {
    let spectator: Spectator<ContainerPreviewComponent>;
    const createComponent = createComponentFactory({
        component: ContainerPreviewComponent,
        imports: [SharedModule],
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });

    it('should display no container hint in case no container available', () => {
        expect(spectator.fixture.debugElement.query(By.css('.no-content-available'))).toBeTruthy();
    });

    it('should display container preview and properties in case container is available', () => {
        spectator.setInput('container', { 'height': 10, 'length': 10, 'width': 10 } as IContainer);

        expect(spectator.fixture.debugElement.queryAll(By.css('.description')).length).toBe(1);
        expect(spectator.fixture.debugElement.queryAll(By.css('.property-row .property')).length).toBe(4);
        expect(spectator.fixture.debugElement.queryAll(By.css('.chart-wrapper')).length).toBe(1);
    });
});
