import { ThreeDCalculationService } from './three-d-calculation.service';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

describe('ThreeDCalculationService', () => {
    let spectator: SpectatorService<ThreeDCalculationService>;
    const createService = createServiceFactory({
        service: ThreeDCalculationService
    });

    beforeEach(() => spectator = createService());

    it('should be created', () => {
        expect(spectator.service).toBeTruthy();
    });
});
