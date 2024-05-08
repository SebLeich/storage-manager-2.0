
import { StoreModule } from '@ngrx/store';
import { FunctionFormGroupService } from './function-form-group.service';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

describe('FunctionFormGroupService', () => {
    let spectator: SpectatorService<FunctionFormGroupService>;

    const createService = createServiceFactory({
        service: FunctionFormGroupService,
        imports: [
            StoreModule.forRoot({})
        ]
    });

    beforeEach(() => spectator = createService());

    it('should be created', () => {
        expect(spectator.service).toBeTruthy();
    });
});
