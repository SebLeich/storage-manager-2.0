
import { ApiConnectorDialogComponent } from './api-connector-dialog.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TranslationModule } from '@/lib/translation';
import { MockProvider } from 'ng-mocks';
import { MatIconModule } from '@angular/material/icon';

describe('ApiConnectorDialogComponent', () => {
    let spectator: Spectator<ApiConnectorDialogComponent>;

    const createComponent = createComponentFactory({
        component: ApiConnectorDialogComponent,
        imports: [
            MatDialogModule,
            MatIconModule,
            TranslationModule
        ],
        providers: [
            MockProvider(MatDialogRef)
        ]
    });

    beforeEach(() => spectator = createComponent());

    it('should create', () => {
        expect(spectator.component).toBeTruthy();
    });
});
