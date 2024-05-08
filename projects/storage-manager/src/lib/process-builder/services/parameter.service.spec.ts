
import { StoreModule } from '@ngrx/store';
import { ParameterService } from './parameter.service';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

describe('ParameterService', () => {
    let spectator: SpectatorService<ParameterService>;

    const createService = createServiceFactory({
        imports: [
            StoreModule.forRoot({})
        ],
        service: ParameterService
    });

    beforeEach(() => spectator = createService());

    it('should be created', () => {
        expect(spectator.service).toBeTruthy();
    });
});
